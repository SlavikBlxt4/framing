// PhotoGrid.tsx
import { DownloadSimple } from 'phosphor-react-native';
import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import RNModal from 'react-native-modal';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

interface Props {
  count: number;
}

const { width, height } = Dimensions.get('window');

const PhotoGrid: React.FC<Props> = ({ count }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 🧠 Generamos solo una vez las imágenes ficticias
  const images = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      uri: `https://picsum.photos/id/${i + 10}/300/300`,
    }));
  }, [count]);

  const openModal = (uri: string) => setSelectedImage(uri);
  const closeModal = () => setSelectedImage(null);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => openModal(item.uri)} style={styles.item}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );
  
  const handleDownload = async (uri: string) => {
    // Paso 1: pedir permiso
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería para guardar la imagen.');
      return;
    }
  
    try {
      // Paso 2: descargar la imagen temporalmente
      const fileUri = FileSystem.documentDirectory + 'imagen.jpg';
      const downloadResumable = FileSystem.createDownloadResumable(uri, fileUri);
      const result = await downloadResumable.downloadAsync();
  
      if (result?.uri) {
        // Paso 3: guardar en galería
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        await MediaLibrary.createAlbumAsync('Descargas', asset, false);
        Alert.alert('¡Guardado!', 'La imagen se ha guardado en tu galería.');
      } else {
        Alert.alert('Error', 'No se pudo descargar la imagen.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al guardar la imagen.');
    }
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        renderItem={renderItem}
      />

        <RNModal
            isVisible={!!selectedImage}
            onBackdropPress={closeModal}
            backdropOpacity={0.9}
            >
            <View style={styles.modalContent}>
                <Image source={{ uri: selectedImage! }} style={styles.fullImage} resizeMode="contain" />
                
                {/* Botón de descarga */}
                <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(selectedImage!)}>
                <DownloadSimple size={28} color="#fff" weight="bold" />
                </TouchableOpacity>
            </View>
        </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  item: {
    margin: 4,
    width: width / 4 - 12,
    height: width / 4 - 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  modalContent: {
    // backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.7,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  downloadButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },  
});

export default PhotoGrid;
