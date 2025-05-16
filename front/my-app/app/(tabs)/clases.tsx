import React, { useState, useCallback } from 'react';
import { View, Text, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useUser } from '../components/UserContext';
import { obtenerReservasPorUsuario } from '../services/reservas/reservaService';
import BotonCancelarReserva from '../components/BotonCancelarReserva';
import styles from '../../styles/MisClasesStyles';
import { useFocusEffect } from '@react-navigation/native';

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

  // Recarga las reservas cada vez que la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      let isActive = true; // Para evitar actualizar estado si la pantalla se desenfoca rápido

      const obtenerReservas = async () => {
        setCargando(true);
        try {
          const reservasDelUsuario = await obtenerReservasPorUsuario(id, token);
          if (isActive) setReservas(reservasDelUsuario);
        } catch {
          if (isActive) Alert.alert('Error', 'No se pudieron cargar las reservas');
        } finally {
          if (isActive) setCargando(false);
        }
      };

      obtenerReservas();

      return () => {
        isActive = false; // Cleanup
      };
    }, [id, token])
  );

  const reservasPorFecha = reservas.reduce((acc, reserva) => {
    const fecha = reserva.turno.fecha;
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(reserva);
    return acc;
  }, {} as Record<string, Reserva[]>);

const formatearFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  // Crear Date sin UTC para usar zona horaria local
  const date = new Date(anio, mes - 1, dia);
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  return date.toLocaleDateString('es-ES', opciones);
};


  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (reservas.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, color: '#666', fontStyle: 'italic' }}>
          No tienes reservas por el momento
        </Text>
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
