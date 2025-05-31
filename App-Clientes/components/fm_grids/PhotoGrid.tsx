import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import RNModal from 'react-native-modal';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const { width, height } = Dimensions.get('window');

interface ImageItem {
  id: number;
  uri: string;
}

interface Props {
  images: ImageItem[];
}

const PhotoGrid: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  const openModal = (uri: string) => !selectionMode && setSelectedImage(uri);
  const closeModal = () => setSelectedImage(null);

  const onLongPress = (id: number) => {
    setSelectionMode(true);
    setSelected([id]);
  };

  const onPress = (id: number, uri: string) => {
    if (!selectionMode) {
      openModal(uri);
    } else {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };

  const handleBatchDownload = async () => {
    const selectedImages = images.filter(img => selected.includes(img.id));

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado');
      return;
    }

    try {
      for (const image of selectedImages) {
        const fileUri = FileSystem.documentDirectory + `img_${image.id}.jpg`;
        const download = FileSystem.createDownloadResumable(image.uri, fileUri);
        const result = await download.downloadAsync();
        if (result?.uri) {
          const asset = await MediaLibrary.createAssetAsync(result.uri);
          await MediaLibrary.createAlbumAsync('Descargas', asset, false);
        }
      }
      Alert.alert('Listo', 'Imágenes guardadas en tu galería');
      setSelectionMode(false);
      setSelected([]);
    } catch (error) {
      console.error('Error al descargar:', error);
      Alert.alert('Error', 'No se pudieron descargar todas las imágenes');
    }
  };

  const renderItem = ({ item }: { item: ImageItem }) => (
    <TouchableOpacity
      onLongPress={() => onLongPress(item.id)}
      onPress={() => onPress(item.id, item.uri)}
      style={[
        styles.item,
        selected.includes(item.id) && selectionMode && styles.selectedItem,
      ]}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  const allSelected = selected.length === images.length;

  return (
    <View style={styles.container}>
      {selectionMode && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              allSelected
                ? setSelected([])
                : setSelected(images.map(i => i.id))
            }
          >
            <Text style={styles.actionText}>
              {allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBatchDownload}>
            <Text style={styles.actionText}>
              Descargar ({selected.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
          <Image
            source={{ uri: selectedImage! }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  item: {
    margin: 4,
    width: width / 4 - 12,
    height: width / 4 - 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  selectedItem: {
    borderColor: '#007d8a',
    borderWidth: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  modalContent: {
    backgroundColor: 'rgba(0,0,0,0.95)',
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007d8a',
  },
});

export default PhotoGrid;
