import React from 'react';
import { View, Text, TextInput, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Photographer {
  id: string;
  name: string;
  rating: number;
  image: any;
}

const photographers: Photographer[] = [
  { id: '1', name: 'Estudio Fotográfico', rating: 4.2, image: require('../assets/photo1.jpg') },
  { id: '2', name: 'Estudio Fotográfico', rating: 4.2, image: require('../assets/photo2.jpg') }
];

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Encabezado */}
      <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
        <Text style={{ fontSize: 16, color: '#777' }}>6 de febrero de 2025</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Bienvenido, Usuario</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 }}>
          <Ionicons name="search" size={20} color="#777" />
          <TextInput placeholder="Buscar" style={{ flex: 1, marginLeft: 10 }} />
        </View>
      </View>

      <ScrollView>
        {/* Sesiones contratadas */}
        <View style={{ margin: 16, backgroundColor: '#008080', borderRadius: 10, padding: 16 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Estudio Fotográfico</Text>
          <Text style={{ color: '#ddd', fontSize: 14 }}>Próxima sesión: 6 de febrero de 2025</Text>
          <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#fff', padding: 10, borderRadius: 8 }}>
            <Text style={{ color: '#008080', fontWeight: 'bold' }}>Ver reserva</Text>
          </TouchableOpacity>
        </View>

        {/* Fotógrafos de exterior */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 16 }}>Fotógrafos de exterior</Text>
        <FlatList
          horizontal
          data={photographers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ margin: 10, backgroundColor: '#fff', borderRadius: 10, padding: 10, alignItems: 'center' }}>
              <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 8 }} />
              <Text>{item.name}</Text>
              <Text>{item.rating} ⭐</Text>
            </View>
          )}
        />

        {/* Publicidad */}
        <View style={{ margin: 16, backgroundColor: '#000', borderRadius: 10, padding: 16, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>FRAMING</Text>
          <TouchableOpacity>
            <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>Eliminar publicidad</Text>
          </TouchableOpacity>
        </View>

        {/* Fotógrafos de interior */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 16 }}>Fotógrafos de interior</Text>
        <FlatList
          horizontal
          data={photographers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ margin: 10, backgroundColor: '#fff', borderRadius: 10, padding: 10, alignItems: 'center' }}>
              <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 8 }} />
              <Text>{item.name}</Text>
              <Text>{item.rating} ⭐</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* Barra de navegación */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#f8f8f8' }}>
        <Ionicons name="home" size={24} color="#008080" />
        <Ionicons name="book" size={24} color="#777" />
        <Ionicons name="person" size={24} color="#777" />
      </View>
    </View>
  );
};

export default HomeScreen;
