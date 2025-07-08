import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Image,Alert,KeyboardAvoidingView,Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AVATAR_URLS = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
];

export default function PerfilScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    carregarPerfil();
  }, 
);

  function gerarAvatarAleatorio() {
    const index = Math.floor(Math.random() * AVATAR_URLS.length);
    return AVATAR_URLS[index];
  }

  async function carregarPerfil() {
    try {
      const perfil = await AsyncStorage.getItem('@perfil');
      if (perfil) {
        const { nome, email, avatarUrl } = JSON.parse(perfil);
        setNome(nome);
        setEmail(email);
        setAvatarUrl(avatarUrl);
      } else {
        // Se não tiver perfil salvo, gera um avatar novo
        setAvatarUrl(gerarAvatarAleatorio());
      }
    } catch (error) {
      console.log('Erro ao carregar perfil:', error);
    }
  }

  async function salvarPerfil() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha nome e email.');
      return;
    }
    try {
      const perfil = { nome, email, avatarUrl };
      await AsyncStorage.setItem('@perfil', JSON.stringify(perfil));
      Alert.alert('Sucesso', 'Perfil salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
  }

  function trocarAvatar() {
    setAvatarUrl(gerarAvatarAleatorio());
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titulo}>Perfil</Text>

      <TouchableOpacity onPress={trocarAvatar}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.trocarTexto}>Trocar avatar</Text>
      </TouchableOpacity>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={salvarPerfil}>
        <Text style={styles.botaoTexto}>Salvar Perfil</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  trocarTexto: {
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botao: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
