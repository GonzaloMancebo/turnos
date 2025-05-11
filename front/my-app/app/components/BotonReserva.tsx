import React, { useState } from "react";
import { Alert, TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { generarReservas } from "../services/reservas/reservaService";
import { useUser } from "../components/UserContext";  // Usamos el contexto para acceder al id

interface BotonReservaProps {
  turnoId: number;
  cuposDisponibles: number;
  yaReservado: boolean;
  onReservaExitosa?: (nuevosCupos: number) => void;
}

const BotonReserva: React.FC<BotonReservaProps> = ({
  turnoId,
  cuposDisponibles,
  yaReservado,
  onReservaExitosa,
}) => {
  const [cargando, setCargando] = useState(false);
  const { id, email, token } = useUser();  // Aquí obtenemos el id, email y token desde el contexto

  const handleReserva = async () => {
    console.log("ID del usuario:", id);  // Verifica si el id está correcto
    console.log("Email del usuario:", email);  // Verifica si el email está correcto
    console.log("Token del usuario:", token);  // Verifica si el token está correcto

    if (!id || !email || !token) {
      return Alert.alert("Error", "Usuario no autenticado.");
    }

    if (cuposDisponibles === 0) {
      return Alert.alert("Cupo lleno", "No hay más cupos disponibles.");
    }

    setCargando(true);
    try {
      const puntosUtilizados = 1; // Aquí defines que se van a usar 1 punto, puedes modificarlo según la lógica de tu aplicación
      const { cupos_disponibles } = await generarReservas(
        id,  // Usamos el id del usuario
        turnoId,
        puntosUtilizados,  // Aquí pasamos los puntos utilizados
        token  // Enviamos el token para la autenticación
      );
      Alert.alert("Reserva exitosa");
      onReservaExitosa?.(cupos_disponibles);
    } catch  {
      Alert.alert("Error", "No se pudo realizar la reserva.");
    }
    setCargando(false);
  };

  if (yaReservado) {
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
