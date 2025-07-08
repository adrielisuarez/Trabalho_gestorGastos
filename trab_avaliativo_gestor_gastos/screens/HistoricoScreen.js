import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import CardGasto from '../components/CardGasto';

export default function HistoricoScreen() {
  const { gastos, excluirGasto } = useContext(AppContext);

  function confirmarExcluir(index) {
    Alert.alert(
      'Excluir gasto',
      'Tem certeza que deseja excluir este gasto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => excluirGasto(index),
        },
      ],
      { cancelable: true }
    );
  }

  if (gastos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textoVazio}>Nenhum gasto registrado.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={gastos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <CardGasto
          descricao={item.descricao}
          valor={item.valor}
          categoria={item.categoria}
          onDelete={() => confirmarExcluir(index)}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textoVazio: { fontSize: 18, color: '#666' },
  listContainer: { paddingVertical: 10 },
});
