import React, { useState } from "react";
import {
	View,
	Text,
	Modal,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Button,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { obtenerClasesPorDia } from "../services/clases/claseService";
import { obtenerTurnosPorClase } from "../services/turnos/turnoService";
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
	fecha: Date;
	hora_inicio: string;
	hora_fin: string;
	nivel: string;
	cupo_maximo: number;
}

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
		const date = new Date(day.dateString);
		const dayOfWeek = date.getDay(); // 0 = domingo, 6 = sábado

		if (dayOfWeek === 0 || dayOfWeek === 6) {
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

		const options = { weekday: "long" };
		const dayOfWeekStr = new Date(day.dateString).toLocaleDateString(
			"es-ES",
			options
		);

		try {
			const clasesObtenidas = await obtenerClasesPorDia(dayOfWeekStr);
			if (clasesObtenidas.sin_clases) {
				setClases([]);
				setError(clasesObtenidas.mensaje);
			} else {
				setClases(clasesObtenidas);
				setError(null);
			}
		} catch {
			setError("No se pudieron obtener las clases. Intenta de nuevo.");
		}

		setLoading(false);
	};

	const abrirTurnosDeClase = async (clase: Clase) => {
		setClaseSeleccionada(clase);
		setModalTurnosVisible(true);
		setLoading(true);
		setError(null);

		try {
			const turnosObtenidos = await obtenerTurnosPorClase(clase.id);
			// Verificar que 'turnosObtenidos' sea un arreglo válido
			if (Array.isArray(turnosObtenidos)) {
				// Si es un arreglo, lo asignamos
				setTurnos(turnosObtenidos);
			} else {
				// Si no es un arreglo, establecemos un arreglo vacío
				setTurnos([]);
			}
		} catch {
			setError("Error al obtener los turnos.");
		}

		setLoading(false);
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
						clases.map((clase) => (
							<TouchableOpacity
								key={clase.id}
								onPress={() => abrirTurnosDeClase(clase)}
								style={styles.claseCard}>
								<Text style={styles.claseNombre}>{clase.nombre}</Text>
								<Text style={styles.claseInfo}>Nivel: {clase.nivel}</Text>
							</TouchableOpacity>
						))
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
								.sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio)) // Ordena los turnos por hora_inicio
								.map((turno) => (
									<View key={turno.id} style={styles.turnoCard}>
										<View style={styles.row}>
											<Text
												style={
													styles.hora
												}>{`${turno.hora_inicio} - ${turno.hora_fin}`}</Text>
											<Button
												title="Reservar"
												onPress={() => {
													console.log(`Reservar turno: ${turno.id}`);
												}}
											/>
										</View>
										<Text style={styles.disponibles}>
                    Turnos disponibles: {turno.cupo_maximo || 'No disponible'}
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
