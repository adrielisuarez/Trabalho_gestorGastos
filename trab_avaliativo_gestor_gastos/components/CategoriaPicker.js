import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CategoriaPicker({ selectedValue, onValueChange, categorias }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {categorias.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 5,
  },
  picker: {
    width: '100%',
  },
});