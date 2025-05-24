import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function LocationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchPlaces = async (text: string) => {
    setQuery(text);
    if (text.length < 3) return;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=es&q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'framing-tfg', // importante para evitar ser bloqueado
        },
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error buscando dirección:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Introduce dirección"
        value={query}
        onChangeText={searchPlaces}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => {
              console.log('Dirección:', item.display_name);
              console.log('Latitud:', item.lat);
              console.log('Longitud:', item.lon);
              // Aquí puedes llamar al backend con { lat: item.lat, lng: item.lon }
            }}
          >
            <Text>{item.display_name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 8,
  },
});
