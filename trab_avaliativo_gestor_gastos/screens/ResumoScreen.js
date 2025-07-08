// screens/ResumoScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import { PieChart } from 'react-native-chart-kit';

export default function ResumoScreen() {
  const { gastos } = useContext(AppContext);

  const totalReceitas = gastos
    .filter((g) => g.valor > 0)
    .reduce((acc, g) => acc + g.valor, 0);

  const totalDespesas = gastos
    .filter((g) => g.valor < 0)
    .reduce((acc, g) => acc + g.valor, 0);

  const saldo = totalReceitas + totalDespesas;

  const pieData =
    totalReceitas === 0 && totalDespesas === 0
      ? []
      : [
          {
            name: 'Receitas',
            population: totalReceitas,
            color: '#4CAF50',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
          {
            name: 'Despesas',
            population: Math.abs(totalDespesas),
            color: '#F44336',
            legendFontColor: '#333',
            legendFontSize: 14,
          },
        ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>

      <View style={styles.card}>
        <Text style={styles.icone}>💰</Text>
        <Text style={styles.label}>Receitas</Text>
        <Text style={styles.valorPositivo}>R$ {totalReceitas.toFixed(2)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icone}>💸</Text>
        <Text style={styles.label}>Despesas</Text>
        <Text style={styles.valorNegativo}>R$ {Math.abs(totalDespesas).toFixed(2)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icone}>📊</Text>
        <Text style={styles.label}>Saldo</Text>
        <Text
          style={[
            styles.valorSaldo,
            { color: saldo >= 0 ? '#4CAF50' : '#F44336' },
          ]}
        >
          R$ {saldo.toFixed(2)}
        </Text>
      </View>

      {pieData.length > 0 && (
        <View style={styles.graficoContainer}>
          <Text style={styles.graficoTitulo}>Distribuição</Text>
          <PieChart
            data={pieData}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f4f4f4',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    alignItems: 'center',
  },
  icone: {
    fontSize: 30,
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  valorPositivo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  valorNegativo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F44336',
  },
  valorSaldo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  graficoContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  graficoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
