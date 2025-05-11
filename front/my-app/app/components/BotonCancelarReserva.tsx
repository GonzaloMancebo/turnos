import React, { useState } from "react";
import {
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { eliminarReserva } from "../services/reservas/reservaService";
import { useUser } from "../components/UserContext";

interface BotonCancelarReservaProps {
  reservaId: number;
  cuposDisponibles: number;
  onCancelacionExitosa?: (nuevosCupos: number) => void;
}

const BotonCancelarReserva: React.FC<BotonCancelarReservaProps> = ({
  reservaId,
  cuposDisponibles,
  onCancelacionExitosa,
}) => {
  const [cargando, setCargando] = useState(false);
  const { token } = useUser();

  const handleCancelar = async () => {
    if (!token) {
      return Alert.alert("Error", "Usuario no autenticado.");
    }

    setCargando(true);
    try {
      console.log("Cancelando reserva con ID:", reservaId);
      await eliminarReserva(reservaId, token);
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
