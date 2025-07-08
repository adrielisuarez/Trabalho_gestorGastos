import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardGasto({ descricao, valor, categoria, onDelete }) {
  const isReceita = valor >= 0;

  return (
    <View style={[styles.card, { borderLeftColor: isReceita ? '#4CAF50' : '#F44336' }]}>
      <View style={styles.infoContainer}>
        <Text style={styles.descricao}>{descricao}</Text>
        <Text style={[styles.valor, { color: isReceita ? '#4CAF50' : '#F44336' }]}>
          R$ {valor.toFixed(2)}
        </Text>
      </View>
      <View style={styles.rodape}>
        <Text style={styles.categoria}>{categoria}</Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.botaoExcluir}>
            <Ionicons name="trash" size={22} color="#F44336" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
    borderLeftWidth: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  descricao: { fontSize: 16, fontWeight: '500' },
  valor: { fontSize: 16, fontWeight: '600' },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoria: { fontSize: 14, color: '#666', fontStyle: 'italic' },
  botaoExcluir: { padding: 4 },
});
