import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useUser } from '../components/UserContext';
import { obtenerReservasPorUsuario } from '../services/reservas/reservaService'; // Importamos solo la función de obtener
import BotonCancelarReserva from '../components/BotonCancelarReserva'; // El botón se encarga de la cancelación
import styles from '../../styles/MisClasesStyles';

export default function TimelapScreen() {
  const { id, token } = useUser();
  const [reservas, setReservas] = useState<Reserva[]>([]);  
  const [cargando, setCargando] = useState(true);

  interface Turno {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    cupo_maximo: number;
  }

  interface Reserva {
    id: number;
    turno: Turno;
  }

  // Obtener las reservas del usuario cuando se monta el componente
  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const reservasDelUsuario = await obtenerReservasPorUsuario(id, token);
        setReservas(reservasDelUsuario);
      } catch  {
        Alert.alert('Error', 'No se pudieron cargar las reservas');
      } finally {
        setCargando(false);
      }
    };

    obtenerReservas();
  }, [id, token]);

  // Agrupar reservas por fecha
  const reservasPorFecha = reservas.reduce((acc, reserva) => {
    const fecha = reserva.turno.fecha;
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(reserva);
    return acc;
  }, {} as Record<string, Reserva[]>);  // Ahora usamos el tipo correcto

  // Función para formatear la fecha
  const formatearFecha = (fecha: string) => {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', opciones);  // Formato en español
  };

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(reservasPorFecha).sort().map((fecha) => (
          <View key={fecha} style={{ marginBottom: 20 }}>
            <Text style={styles.fechaTitulo}>{formatearFecha(fecha)}</Text>
            {reservasPorFecha[fecha].map((item: Reserva) => ( 
              <View key={item.id} style={styles.slotItem}>
                <View style={styles.filaClase}>
                  <Text style={styles.horaTexto}>
                    {item.turno.hora_inicio} - {item.turno.hora_fin}
                  </Text>
                  {/* Botón para cancelar la reserva, el componente se encarga de la lógica */}
                  <BotonCancelarReserva
                    reservaId={item.turno.id}
                    cuposDisponibles={item.turno.cupo_maximo}
                    onCancelacionExitosa={() => 
                      setReservas((prev) => prev.filter((reserva) => reserva.id !== item.id))
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
