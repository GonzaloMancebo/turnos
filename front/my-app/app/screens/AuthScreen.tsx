import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
	Image,
	ActivityIndicator,
} from "react-native";
import styles from "../../styles/AuthScreenStyles";
import Colors from "../constants/Colors";
import authService from "../services/auth/authService";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function AuthScreen() {
	const [isRegistering, setIsRegistering] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async () => {
		// Validación de campos vacíos
		if (!email || !password || (isRegistering && !name)) {
			Toast.show({
				type: "error",
				position: "top",
				text1: "Campos incompletos",
				text2: "Por favor completá todos los campos.",
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 50,
			});
			return;
		}

		// Validación del correo
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (!emailRegex.test(email)) {
			Toast.show({
				type: "error",
				position: "top",
				text1: "Correo inválido",
				text2: "El correo proporcionado no tiene un formato válido.",
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 50,
			});
			return;
		}

		// Validación de la contraseña (mínimo 6 caracteres, puedes personalizarlo)
		if (password.length < 6) {
			Toast.show({
				type: "error",
				position: "top",
				text1: "Contraseña demasiado corta",
				text2: "La contraseña debe tener al menos 6 caracteres.",
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 50,
			});
			return;
		}

		try {
			setIsLoading(true); // Activar el indicador de carga

			// Forzar un pequeño retraso antes de proceder
			setTimeout(async () => {
				try {
					let result;
					if (isRegistering) {
						result = await authService.register(name, email, password);
						console.log("Registro exitoso:", result);
						Toast.show({
							type: "success",
							position: "top",
							text1: "¡Registro exitoso!",
							text2: "Te registraste correctamente. Inicia sesión.",
							visibilityTime: 3000,
							autoHide: true,
							topOffset: 50,
						});
						setIsRegistering(false);
					} else {
						result = await authService.login(email, password);
						console.log("Login exitoso:", result);
						router.push("/(tabs)/home");
					}
				} catch (err: any) {
					const message =
						err?.response?.data?.message ||
						"Ocurrió un error. Intentá de nuevo.";
					Toast.show({
						type: "error",
						position: "top",
						text1: "Error en autenticación",
						text2: message,
						visibilityTime: 3000,
						autoHide: true,
						topOffset: 50,
					});
				} finally {
					setIsLoading(false); // Desactivar el indicador de carga
				}
			}, 900); // Retraso mínimo de 500ms para que el indicador sea visible
		} catch  {
			setIsLoading(false); // En caso de error, también detener el indicador de carga
		}
	};

	const toggleMode = () => {
		setIsRegistering((prev) => !prev);
		setName("");
		setEmail("");
		setPassword("");
	};

	return (
		<View
			style={[
				styles.container,
				{ justifyContent: "center", alignItems: "center" },
			]}>
			<StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
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
			<TouchableOpacity
				style={styles.loginButton}
				onPress={handleSubmit}
				disabled={isLoading}>
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
