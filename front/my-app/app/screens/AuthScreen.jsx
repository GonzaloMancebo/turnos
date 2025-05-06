import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, Alert, ActivityIndicator } from "react-native";
import styles from "../../styles/AuthScreenStyles"; 
import Colors from "../constants/Colors"; 
import authService from '../services/auth/authService';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Estado para manejar el indicador de carga

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password || (isRegistering && !name)) {
      Alert.alert('Campos incompletos', 'Por favor completá todos los campos.');
      return;
    }

    try {
      setIsLoading(true);  // Activar el indicador de carga

      // Forzar un pequeño retraso antes de proceder
      setTimeout(async () => {
        try {
          let result;
          if (isRegistering) {
            result = await authService.register(name, email, password);
            console.log('Registro exitoso:', result);
            Alert.alert('Éxito', 'Te registraste correctamente.');
            setIsRegistering(false);
          } else {
            result = await authService.login(email, password);
            console.log('Login exitoso:', result);
            router.push('/screens/HomeScreen');  // Redirigir al HomeScreen
          }
        } catch (err) {
          const message = err?.response?.data?.message || 'Ocurrió un error. Intentá de nuevo.';
          Alert.alert('Error', message);
          console.error('Error en autenticación:', err);
        } finally {
          setIsLoading(false);  // Desactivar el indicador de carga
        }
      }, 900);  // Retraso mínimo de 500ms para que el indicador sea visible
    } catch (_err) {
      setIsLoading(false); // En caso de error, también detener el indicador de carga
    }
  };

  const toggleMode = () => {
    setIsRegistering(prev => !prev);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Logo */}
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logoImageStyle}
      />

      {/* Formulario */}
      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor={Colors.secondary}
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor={Colors.secondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={Colors.secondary}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* Botón con indicador de carga */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>
            {isRegistering ? "Registrarse" : "Ingresar"}
          </Text>
        )}
      </TouchableOpacity>

      {/* Línea divisoria */}
      <View style={styles.dividerStyle} />

      {/* Switch de modo */}
      <TouchableOpacity style={styles.signupStyle} onPress={toggleMode}>
        <Text style={styles.signupTextStyle}>
          {isRegistering
            ? "¿Ya tenés cuenta? Iniciá sesión"
            : "¿No tenés cuenta? Registrate"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
