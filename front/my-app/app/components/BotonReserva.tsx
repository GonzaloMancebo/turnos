import React, { useState } from "react";
import { Alert, TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { generarReservas } from "../services/reservas/reservaService";
import { useUser } from "../components/UserContext";
import { useReserva } from "../components/ReservaContext"; 

interface BotonReservaProps {
  turnoId: number;
  cuposDisponibles: number;
  usuarioYaReservo: boolean; // 👈 nuevo prop
  onReservaExitosa?: (nuevosCupos: number) => void;
}

const BotonReserva: React.FC<BotonReservaProps> = ({
  turnoId,
  cuposDisponibles,
  usuarioYaReservo,
  onReservaExitosa,
}) => {
  const [cargando, setCargando] = useState(false);

  const { id, email, token } = useUser();
  const { reservarTurno, actualizarCupos } = useReserva(); // no usamos estaReservado acá

  const handleReserva = async () => {
    console.log("handleReserva iniciado", { id, email, token, turnoId, cuposDisponibles });

    if (!id || !email || !token) {
      return Alert.alert("Error", "Usuario no autenticado.");
    }

    if (cuposDisponibles === 0) {
      return Alert.alert("Cupo lleno", "No hay más cupos disponibles.");
    }

    setCargando(true);
    try {
      const puntosUtilizados = 1;
      const { cupos_disponibles } = await generarReservas(id, turnoId, puntosUtilizados, token);

      console.log("Reserva API exitosa, actualizando context");
      reservarTurno(turnoId);
      actualizarCupos(turnoId, cupos_disponibles);

      onReservaExitosa?.(cupos_disponibles);
      Alert.alert("Reserva exitosa");
    } catch (error) {
      console.log("Error en reserva:", error);
      Alert.alert("Error", "No se pudo realizar la reserva.");
    } finally {
      setCargando(false);
    }
  };

  if (usuarioYaReservo) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "grey",
          padding: 10,
          borderRadius: 4,
          opacity: 0.8,
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Reservado</Text>
      </TouchableOpacity>
    );
  }

  if (cargando) {
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="small" color="#4caf50" />
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleReserva}
      disabled={cuposDisponibles === 0}
      style={{
        backgroundColor: cuposDisponibles > 0 ? "#4caf50" : "#ccc",
        padding: 10,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>
        {cuposDisponibles === 0 ? "Cupo lleno" : "Reservar"}
      </Text>
    </TouchableOpacity>
  );
};

export default BotonReserva;
