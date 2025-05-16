import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { obtenerPerfil, actualizarPerfil } from '../services/perfil/perfilService';
import { useUser } from '../components/UserContext';
import styles from '../../styles/ProfileScreenStyles';

const avatarOptions = [
  `https://api.dicebear.com/6.x/thumbs/png?seed=dog`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=cat`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=fox`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=panda`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=monkey`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=tiger`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=giraffe`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=zebra`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=lion`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=unicorn`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=dragon`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=robot`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=alien`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=ghost`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=pirate`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=wizard`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=astronaut`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=koala`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=owl`,
  `https://api.dicebear.com/6.x/thumbs/png?seed=raccoon`,
];

// Componente pequeño para texto de chat
function ChatSolicitarPuntos() {
  const handlePress = () => {
    Alert.alert('Chat', 'Aquí se abriría el chat para solicitar más puntos');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginVertical: 15 }}>
      <Text style={{ color: '#2196F3', fontWeight: 'bold', textAlign: 'center' }}>
        ¿Querés más puntos? Contáctanos
      </Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const [perfil, setPerfil] = useState<{ nombre: string; email: string; avatar?: string; puntos?: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useUser();

  // Nuevos estados para inputs editables
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await obtenerPerfil(token);
        setPerfil(data);
        setNombre(data.nombre);
        setEmail(data.email);
        setPuntos(data.puntos ?? 0);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el perfil');
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, [token]);

  const handleAvatarChange = async (newAvatar: string) => {
    try {
      if (!perfil) return;
      const actualizado = { ...perfil, avatar: newAvatar };
      await actualizarPerfil(actualizado, token);
      setPerfil(actualizado);
      setModalAvatarVisible(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el avatar');
    }
  };

  const handleChangePassword = async () => {
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      if (!perfil) return;
      const actualizado = { ...perfil, password };
      await actualizarPerfil(actualizado, token);
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      setModalPasswordVisible(false);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la contraseña');
    }
  };

  // Nueva función para actualizar nombre y email junto con avatar
  const handleActualizarPerfil = async () => {
    try {
      if (!perfil) return;
      const actualizado = { ...perfil, nombre: nombre.trim(), email: email.trim() };
      await actualizarPerfil(actualizado, token);
      setPerfil(actualizado);
      Alert.alert('Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error al actualizar el perfil');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  if (!perfil) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No se encontraron datos del perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar con modal */}
      <TouchableOpacity onPress={() => setModalAvatarVisible(true)}>
        <Image
          source={perfil.avatar ? { uri: perfil.avatar } : require('../../assets/images/icon.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Inputs editables */}
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#A9A9A9"
        autoCapitalize="none"
      />

      {/* Mostrar puntos */}
      <Text style={styles.points}>Puntos: {perfil.puntos}</Text>


      {/* Texto para abrir chat */}
      <ChatSolicitarPuntos />

      {/* Botón para actualizar perfil */}
      <TouchableOpacity onPress={handleActualizarPerfil} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Actualizar perfil</Text>
      </TouchableOpacity>

      {/* Botón para abrir modal de cambiar contraseña */}
      <TouchableOpacity onPress={() => setModalPasswordVisible(true)} style={styles.changePasswordButton}>
        <Text style={styles.changePasswordText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      {/* Modal Avatares */}
      <Modal visible={modalAvatarVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Elegí tu nuevo avatar</Text>
          <ScrollView contentContainerStyle={styles.avatarList}>
            {avatarOptions.map((url, index) => (
              <TouchableOpacity key={index} onPress={() => handleAvatarChange(url)}>
                <Image source={{ uri: url }} style={styles.avatarOption} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setModalAvatarVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal Cambiar Contraseña */}
      <Modal visible={modalPasswordVisible} animationType="slide" transparent={true}>
        <View style={styles.modalPasswordContainer}>
          <View style={styles.modalPasswordContent}>
            <Text style={styles.modalTitle}>Cambiar contraseña</Text>
            <TextInput
              placeholder="Nueva contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#A9A9A9"
            />
            <TextInput
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity onPress={handleChangePassword} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalPasswordVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
