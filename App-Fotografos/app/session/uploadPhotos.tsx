import { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import { X, Plus, Check } from 'phosphor-react-native';

interface Photo {
  uri: string;
  id: string;
}

export default function UploadPhotosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [photos, setPhotos] = useState<Photo[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, { uri: result.assets[0].uri, id: Date.now().toString() }]);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const handleSave = async () => {
    // Aquí implementaremos la lógica para guardar las fotos
    console.log('Guardando fotos:', photos);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <StyledText style={styles.title} weight="bold">
          Subir fotos para {params.clientName}
        </StyledText>
        <StyledText style={styles.subtitle}>
          Sesión del {params.bookingDate}
        </StyledText>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
          <Plus size={32} color={Colors.light.tint} weight="bold" />
          <StyledText style={styles.addButtonText}>Agregar foto</StyledText>
        </TouchableOpacity>
      </View>

      {photos.length > 0 && (
        <View style={styles.photosSection}>
          <StyledText style={styles.sectionTitle} weight="bold">Fotos seleccionadas</StyledText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoRow}>
            {photos.map((photo, idx) => (
              <View
                key={photo.id}
                style={[
                  styles.photoContainer,
                  idx !== photos.length - 1 && { marginRight: 16 },
                ]}
              >
                <Image source={{ uri: photo.uri }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePhoto(photo.id)}
                >
                  <X size={20} color="#fff" weight="bold" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Check size={24} color="#fff" weight="bold" />
          <StyledText style={styles.buttonText}>Guardar fotos</StyledText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  uploadSection: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  addButton: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  addButtonText: {
    marginTop: 8,
    color: Colors.light.tint,
    fontSize: 14,
  },
  photosSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  photoRow: {
    flexDirection: 'row',
  },
  photoContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: Colors.light.background,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
