import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { FontFamily as Fonts } from "@/constants/Fonts";
import api from "@/services/api";
import { router } from "expo-router";
import mime from "mime";

export default function SubirFotosScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (setter: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

const uploadImage = async (uri: string, endpoint: string) => {
  const formData = new FormData();

  const mimeType = mime.getType(uri) || "image/jpeg";
  const ext = mime.getExtension(mimeType) || "jpg";

  formData.append("file", {
    uri,
    name: `upload.${ext}`,
    type: mimeType,
  } as any);

  await api.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // NECESARIO con transformRequest
    },
    transformRequest: (data) => data,
  });
};


  const handleSave = async () => {
    try {
      if (!profileImage || !coverImage) {
        Alert.alert("Faltan imágenes", "Debes subir ambas imágenes");
        return;
      }

      setLoading(true);

      

      await uploadImage(profileImage, "/users/photographers/upload-profile-image");
      await uploadImage(coverImage, "/users/photographers/upload-cover-image");

      console.log("url", profileImage, coverImage);
      Alert.alert("Perfecto", "Imágenes subidas correctamente");
      router.replace("/(tabs)");
    } catch (err: any) {
      console.error("Error subiendo imágenes:", err);
      Alert.alert("Error", err.message ?? "No se pudo subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
  try {
    const res = await api.get("/");
    console.log("GET ok:", res.data);
  } catch (err) {
    console.error("GET error:", err);
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

      <Pressable style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? (
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
