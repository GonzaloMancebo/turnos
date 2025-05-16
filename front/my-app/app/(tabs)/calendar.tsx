import React, { useState } from "react";
import {
	View,
	Text,
	Modal,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { obtenerClasesPorDia } from "../services/clases/claseService";
import { obtenerTurnosPorClase } from "../services/turnos/turnoService";
import BotonReserva from "../components/BotonReserva";
import styles from "../../styles/CalendarioStyles";

const screenHeight = Dimensions.get("window").height;

interface Clase {
	id: number;
	nombre: string;
	hora: string;
	nivel: string;
}

interface Turno {
	id: number;
	fecha: string;
	hora_inicio: string;
	hora_fin: string;
	nivel: string;
	cupo_maximo: number;
	cupos_disponibles: number;
	reservado: boolean;
	usuario_ya_reservo?: boolean;
}

LocaleConfig.locales["es"] = {
	monthNames: [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	],
	monthNamesShort: [
		"Ene",
		"Feb",
		"Mar",
		"Abr",
		"May",
		"Jun",
		"Jul",
		"Ago",
		"Sep",
		"Oct",
		"Nov",
		"Dic",
	],
	dayNames: [
		"Domingo",
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
		"Sábado",
	],
	dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
	today: "Hoy",
};

LocaleConfig.defaultLocale = "es";

const CalendarioScreen: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [modalTurnosVisible, setModalTurnosVisible] = useState<boolean>(false);
	const [clases, setClases] = useState<Clase[]>([]);
	const [turnos, setTurnos] = useState<Turno[]>([]);
	const [claseSeleccionada, setClaseSeleccionada] = useState<Clase | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleDayPress = async (day: { dateString: string }) => {
		console.log("handleDayPress llamado con:", day);

		const [year, month, dayNum] = day.dateString.split("-").map(Number);
		const date = new Date(year, month - 1, dayNum);

		const diasSemana = [
			"domingo",
			"lunes",
			"martes",
			"miércoles",
			"jueves",
			"viernes",
			"sábado",
		];
		const dayOfWeek = date.getDay();
		const dayOfWeekStr = diasSemana[dayOfWeek];

		console.log("Fecha seleccionada:", day.dateString);
		console.log("Día de la semana:", dayOfWeekStr);

		if (dayOfWeek === 6 || dayOfWeek === 0) {
			console.log("Es fin de semana, no hay clases");
			setSelectedDate(day.dateString);
			setClases([]);
			setError("No hay clases disponibles los fines de semana.");
			setModalVisible(true);
			return;
		}

		setSelectedDate(day.dateString);
		setModalVisible(true);
		setLoading(true);
		setError(null);

		try {
			console.log("Obteniendo clases para:", dayOfWeekStr);
			const clasesObtenidas = await obtenerClasesPorDia(dayOfWeekStr);
			console.log("Respuesta de obtenerClasesPorDia:", clasesObtenidas);

			if (clasesObtenidas.sin_clases) {
				console.log("Sin clases:", clasesObtenidas.mensaje);
				setClases([]);
				setError(clasesObtenidas.mensaje);
			} else {
				console.log("Clases obtenidas:", clasesObtenidas);
				setClases(clasesObtenidas);
				setError(null);
			}
		} catch (error) {
			console.error("Error al obtener clases:", error);
			setError("No se pudieron obtener las clases. Intenta de nuevo.");
		}

		setLoading(false);
	};

	const abrirTurnosDeClase = async (clase) => {
		if (!selectedDate) {
			setError("Por favor selecciona una fecha primero.");
			return;
		}

		console.log("Clase seleccionada:", clase);
		setClaseSeleccionada(clase);
		setModalTurnosVisible(true);
		setLoading(true);
		setError(null);

		try {
			const turnosDesdeAPI = await obtenerTurnosPorClase(
				clase.id,
				selectedDate
			);
			console.log("Turnos desde API:", turnosDesdeAPI);

			if (turnosDesdeAPI.sin_turnos) {
				setTurnos([]);
				setError(turnosDesdeAPI.mensaje || "No hay turnos disponibles.");
			} else {
				setTurnos(turnosDesdeAPI);
				setError(null);
			}
		} catch (err) {
			console.error("Error al obtener turnos:", err);
			setTurnos([]);
			setError("Error al cargar los turnos.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Seleccioná un día</Text>
			<Calendar
				onDayPress={handleDayPress}
				markedDates={
					selectedDate
						? {
								[selectedDate]: {
									selected: true,
									selectedColor: "#A8D5BA",
									selectedTextColor: "#fff",
								},
						  }
						: {}
				}
				theme={{
					backgroundColor: "#FFFFFF",
					calendarBackground: "#FFFFFF",
					textSectionTitleColor: "#7DAA92",
					selectedDayBackgroundColor: "#A8D5BA",
					selectedDayTextColor: "#fff",
					todayTextColor: "#7DAA92",
					dayTextColor: "#2d4150",
					arrowColor: "#7DAA92",
					monthTextColor: "#4E8D7C",
					textDayFontWeight: "500",
					textMonthFontWeight: "bold",
					textDayHeaderFontWeight: "500",
				}}
				style={styles.calendario}
			/>

			<View style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 20 }}
					style={[styles.modalContent, { flex: 1 }]}>
					<Text style={styles.modalTitulo}>Clases del {selectedDate}</Text>

					{loading && <Text>Cargando clases...</Text>}
					{error && <Text style={{ color: "red" }}>{error}</Text>}
					{clases.length === 0 && !loading && !error ? (
						<Text>No hay clases para este día.</Text>
					) : (
						clases.map((clase) => {
							return (
								<TouchableOpacity
									key={clase.id}
									onPress={() => abrirTurnosDeClase(clase)}
									style={styles.claseCard}>
									<Text style={styles.claseNombre}>{clase.nombre}</Text>
									<Text style={styles.claseInfo}>Nivel: {clase.nivel}</Text>
								</TouchableOpacity>
							);
						})
					)}
				</ScrollView>
			</View>

			{/* Modal de Turnos */}
			<Modal visible={modalTurnosVisible} animationType="slide" transparent>
				<View style={styles.modalContainer}>
					<View
						style={[styles.modalContent, { maxHeight: screenHeight * 0.6 }]}>
						<Text style={styles.modalTitulo}>
							Turnos de {claseSeleccionada?.nombre}
						</Text>

						{loading && <Text>Cargando turnos...</Text>}
						{error && <Text style={{ color: "red" }}>{error}</Text>}

						<ScrollView>
							{/* Ordenar turnos por hora de inicio */}
							{(turnos || [])
								.sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))
								.map((turno, index) => (
									<View
										key={
											turno.id
												? turno.id.toString()
												: `${turno.hora_inicio}-${turno.hora_fin}-${index}`
										}
										style={styles.turnoCard}>
										<View style={styles.row}>
											<Text
												style={
													styles.hora
												}>{`${turno.hora_inicio} - ${turno.hora_fin}`}</Text>
								<BotonReserva
  turnoId={turno.id}
  cuposDisponibles={turno.cupos_disponibles}
  usuarioYaReservo={turno.usuario_ya_reservo} 
  onReservaExitosa={(nuevosCupos) => {
    setTurnos((prev) =>
      prev.map((t) =>
        t.id === turno.id
          ? {
              ...t,
              cupos_disponibles: nuevosCupos,
              usuario_ya_reservo: true, // 👈 activamos la vista "Reservado"
            }
          : t
      )
    );
  }}
/>

										</View>
										<Text style={styles.disponibles}>
											Turnos disponibles: {turno.cupos_disponibles}
										</Text>
									</View>
								))}
						</ScrollView>

						<TouchableOpacity
							onPress={() => setModalTurnosVisible(false)}
							style={styles.botonCerrar}>
							<Text style={styles.textoBotonCerrar}>Cerrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default CalendarioScreen;
