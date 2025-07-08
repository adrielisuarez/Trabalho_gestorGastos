import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResumoFinanceiro({ receita, despesa }) {
  const saldo = receita - despesa;
  const corSaldo = saldo >= 0 ? '#4CAF50' : '#F44336';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Receitas</Text>
        <Text style={[styles.valor, { color: '#4CAF50' }]}>R$ {receita.toFixed(2)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Despesas</Text>
        <Text style={[styles.valor, { color: '#F44336' }]}>R$ {despesa.toFixed(2)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Saldo</Text>
        <Text style={[styles.valor, { color: corSaldo }]}>R$ {saldo.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 15,
    elevation: 3,
  },
  card: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
