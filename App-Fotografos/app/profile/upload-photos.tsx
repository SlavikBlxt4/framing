import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { FontFamily as Fonts } from "@/constants/Fonts";
import api from "@/services/api";
import { router } from "expo-router";
import mime from "mime";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SubirFotosScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [verifyingImages, setVerifyingImages] = useState(false);

  const pickImage = async (setter: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

    useEffect(() => {
    let interval: NodeJS.Timeout;
    let stableCounter = 0;
    let previousProfileSize = 0;
    let previousCoverSize = 0;

    const verifyImages = async () => {
      if (!profileImage || !coverImage) {
        setReadyToSubmit(false);
        setVerifyingImages(false);
        return;
      }

      setVerifyingImages(true);

      interval = setInterval(async () => {
        try {
          const profileInfo = await FileSystem.getInfoAsync(profileImage);
          const coverInfo = await FileSystem.getInfoAsync(coverImage);

          const profileSize =
            profileInfo.exists && !profileInfo.isDirectory ? profileInfo.size ?? 0 : 0;
          const coverSize =
            coverInfo.exists && !coverInfo.isDirectory ? coverInfo.size ?? 0 : 0;

          const profileStable = profileSize === previousProfileSize;
          const coverStable = coverSize === previousCoverSize;

          if (
            profileInfo.exists &&
            coverInfo.exists &&
            profileStable &&
            coverStable &&
            profileSize > 0 &&
            coverSize > 0
          ) {
            stableCounter += 1;
          } else {
            stableCounter = 0;
          }

          previousProfileSize = profileSize;
          previousCoverSize = coverSize;

          if (stableCounter >= 2) {
            clearInterval(interval);
            setReadyToSubmit(true);
            setVerifyingImages(false);
          }
        } catch (e) {
          console.error("Error al verificar imágenes:", e);
          clearInterval(interval);
          setReadyToSubmit(false);
          setVerifyingImages(false);
        }
      }, 700); // mejor usar varios ciclos cortos que uno largo
    };

    verifyImages();
    return () => clearInterval(interval);
  }, [profileImage, coverImage]);


  const uploadImage = async (uri: string, endpoint: string, token: string) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error("Archivo no disponible aún: " + uri);
    }

    const mimeType = mime.getType(uri) || "image/jpeg";
    const fileName = uri.split("/").pop() || `upload.${mime.getExtension(mimeType) || "jpg"}`;

    const formData = new FormData();
    formData.append("file", {
      uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
      name: fileName,
      type: mimeType,
    } as any);

    console.log("Subiendo:", fileName, "a", endpoint);

    await api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  };

  const handleSave = async () => {
    try {
      if (!profileImage || !coverImage) {
        Alert.alert("Faltan imágenes", "Debes subir ambas imágenes");
        return;
      }

      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      await uploadImage(profileImage, "/users/photographers/upload-profile-image", token);
      await uploadImage(coverImage, "/users/photographers/upload-cover-image", token);

      Alert.alert("Perfecto", "Imágenes subidas correctamente");
      router.replace("/(tabs)");
    } catch (err: any) {
      console.error("Error subiendo imágenes:", err);
      Alert.alert("Error", err.message ?? "No se pudo subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sube tus imágenes</Text>

      <Pressable style={styles.imageButton} onPress={() => pickImage(setProfileImage)}>
        <Text style={styles.imageButtonText}>Subir Foto de Perfil</Text>
        {profileImage && <Image source={{ uri: profileImage }} style={styles.preview} />}
      </Pressable>

      <Pressable style={styles.imageButton} onPress={() => pickImage(setCoverImage)}>
        <Text style={styles.imageButtonText}>Subir Foto de Portada</Text>
        {coverImage && <Image source={{ uri: coverImage }} style={styles.preview} />}
      </Pressable>

      <Pressable
        style={[styles.saveButton, (!readyToSubmit || verifyingImages || loading) && { opacity: 0.5 }]}
        onPress={handleSave}
        disabled={!readyToSubmit || verifyingImages || loading}
      >
        {loading || verifyingImages ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Guardar y continuar</Text>
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
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: Colors.light.accent,
    padding: 15,
    borderRadius: 10,
    borderColor: Colors.light.tint,
    borderWidth: 1,
  },
  imageButtonText: {
    fontFamily: Fonts.semiBold,
    color: Colors.light.tint,
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});
