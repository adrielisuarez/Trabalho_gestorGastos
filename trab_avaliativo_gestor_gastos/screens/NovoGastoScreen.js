import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import InputPersonalizado from '../components/InputPersonalizado';
import BotaoCustomizado from '../components/BotaoCustomizado';
import CategoriaPicker from '../components/CategoriaPicker';
import { AppContext } from '../contexts/AppContext';

const categoriasDisponiveis = [
  'Alimentação',
  'Transporte',
  'Saúde',
  'Lazer',
  'Outros',
];

export default function NovoGastoScreen() {
  const { adicionarGasto } = useContext(AppContext);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState(categoriasDisponiveis[0]);
  const [tipo, setTipo] = useState('despesa');

  function handleAdicionar() {
    const valorNum = parseFloat(valor.replace(',', '.'));
    if (!descricao || isNaN(valorNum)) {
      Alert.alert('Erro', 'Preencha a descrição e o valor corretamente.');
      return;
    }

    const valorFinal = tipo === 'despesa' ? -Math.abs(valorNum) : Math.abs(valorNum);

    adicionarGasto({ descricao, valor: valorFinal, categoria });
    Alert.alert('Sucesso', 'Gasto adicionado!');
    setDescricao('');
    setValor('');
    setCategoria(categoriasDisponiveis[0]);
    setTipo('despesa');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <InputPersonalizado
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição"
        />
        <InputPersonalizado
          label="Valor"
          value={valor}
          onChangeText={setValor}
          placeholder="0,00"
          keyboardType="numeric"
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Tipo</Text>
          <Picker
            selectedValue={tipo}
            onValueChange={setTipo}
            style={styles.picker}
          >
            <Picker.Item label="Despesa" value="despesa" />
            <Picker.Item label="Receita" value="receita" />
          </Picker>
        </View>
        <CategoriaPicker
          selectedValue={categoria}
          onValueChange={setCategoria}
          categorias={categoriasDisponiveis}
        />
        <BotaoCustomizado title="Adicionar Gasto" onPress={handleAdicionar} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  pickerContainer: {
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
