import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyledText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import api from "@/services/api";
import * as FileSystem from "expo-file-system";
import mime from "mime";

export default function SubirFotosScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verifyingImages, setVerifyingImages] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  useEffect(() => {
    if (!profileImageFile?.uri) {
      setReadyToSubmit(false);
      setVerifyingImages(false);
      return;
    }

    let interval: NodeJS.Timeout;
    let stableCounter = 0;
    let previousSize: number | null = null;

    const checkStability = async () => {
      setVerifyingImages(true);

      interval = setInterval(async () => {
        try {
          const info = await FileSystem.getInfoAsync(profileImageFile.uri);
          const size = info.exists && !info.isDirectory ? info.size ?? 0 : 0;

          const isStable = previousSize === size;
          if (isStable) {
            stableCounter += 1;
          } else {
            stableCounter = 0;
          }

          previousSize = size;

          if (stableCounter >= 4) {
            clearInterval(interval);
            setReadyToSubmit(true);
            setVerifyingImages(false);
          }
        } catch (e) {
          console.error('Verificación fallida:', e);
          clearInterval(interval);
          setReadyToSubmit(false);
          setVerifyingImages(false);
        }
      }, 1500);
    };

    checkStability();
    return () => clearInterval(interval);
  }, [profileImageFile]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const image = result.assets[0];
      setProfileImage(image.uri);
      setProfileImageFile(image);
    }
  };

  const handleSave = async () => {
    if (!profileImageFile) {
      Alert.alert("Selecciona una imagen", "Debes elegir una foto para actualizar tu perfil.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const fileInfo = await FileSystem.getInfoAsync(profileImageFile.uri);
      if (!fileInfo.exists) throw new Error("Archivo no disponible");

      const mimeType = mime.getType(profileImageFile.uri) || "image/jpeg";
      const fileName = profileImageFile.uri.split("/").pop() || `profile.${mime.getExtension(mimeType) || "jpg"}`;

      const formData = new FormData();
      formData.append("file", {
        uri: Platform.OS === "android" ? profileImageFile.uri : profileImageFile.uri.replace("file://", ""),
        name: fileName,
        type: mimeType,
      } as any);

      await api.post("/users/upload-profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Éxito", "Tu foto de perfil se ha actualizado correctamente.");
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Error al subir la imagen:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo actualizar tu foto de perfil."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">
        Foto de perfil
      </StyledText>
      <StyledText style={styles.subtitle}>
        Puedes cambiar tu imagen de perfil
      </StyledText>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <StyledText style={styles.imagePlaceholder}>
            Seleccionar imagen
          </StyledText>
        )}
      </TouchableOpacity>

      <Pressable 
        style={[styles.button, (!readyToSubmit || verifyingImages || loading) && { opacity: 0.5 }]} 
        onPress={handleSave}
        disabled={!readyToSubmit || verifyingImages || loading}
      >
        {loading || verifyingImages ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <StyledText style={styles.buttonText} weight="bold">
            Guardar cambios
          </StyledText>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.tint,
    marginBottom: 18,
  },
  imagePicker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    color: Colors.light.tabIconDefault,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

