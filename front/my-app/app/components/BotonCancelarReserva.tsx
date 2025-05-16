import React, { useState } from "react";
import {
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { eliminarReserva as eliminarReservaAPI } from "../services/reservas/reservaService";
import { useUser } from "../components/UserContext";
import { useReserva } from "../components/ReservaContext";

interface BotonCancelarReservaProps {
  turnoId: number; // Cambié a turnoId para que coincida con el contexto
  reservaId: number;
  cuposDisponibles: number;
  onCancelacionExitosa?: (nuevosCupos: number) => void;
}

const BotonCancelarReserva: React.FC<BotonCancelarReservaProps> = ({
  turnoId,
  reservaId,
  cuposDisponibles,
  onCancelacionExitosa,
}) => {
  const [cargando, setCargando] = useState(false);
  const { token } = useUser();
  const { eliminarReserva, actualizarCupos } = useReserva();

  const handleCancelar = async () => {
    if (!token) {
      return Alert.alert("Error", "Usuario no autenticado.");
    }

    setCargando(true);
    try {
      console.log("Cancelando reserva con ID:", reservaId);
      await eliminarReservaAPI(reservaId, token);

      // Actualizar estado global eliminando reserva y aumentando cupos
      eliminarReserva(turnoId);
      actualizarCupos(turnoId, cuposDisponibles + 1);

      Alert.alert("Reserva cancelada");
      onCancelacionExitosa?.(cuposDisponibles + 1);
    } catch (error) {
      Alert.alert("Error", "No se pudo cancelar la reserva.");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={handleCancelar} style={styles.button}>
      <Text style={styles.buttonText}>Cancelar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  spinnerContainer: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
});

export default BotonCancelarReserva;
