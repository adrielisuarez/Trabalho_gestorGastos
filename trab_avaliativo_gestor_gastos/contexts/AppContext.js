import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

const STORAGE_GASTOS = '@meu_gestor_gastos';
const STORAGE_PERFIL = '@meu_gestor_perfil';

export function AppProvider({ children }) {
  const [gastos, setGastos] = useState([]);
  const [perfil, setPerfil] = useState({ nome: '', email: '', avatarUrl: '' });

  useEffect(() => {
    async function carregarDados() {
      try {
        const gastosSalvos = await AsyncStorage.getItem(STORAGE_GASTOS);
        const perfilSalvo = await AsyncStorage.getItem(STORAGE_PERFIL);
        if (gastosSalvos) setGastos(JSON.parse(gastosSalvos));
        if (perfilSalvo) setPerfil(JSON.parse(perfilSalvo));
      } catch (e) {
        console.log('Erro ao carregar dados:', e);
      }
    }
    carregarDados();
  }, []);

  useEffect(() => {
    async function salvarGastos() {
      try {
        await AsyncStorage.setItem(STORAGE_GASTOS, JSON.stringify(gastos));
      } catch (e) {
        console.log('Erro ao salvar gastos:', e);
      }
    }
    salvarGastos();
  }, [gastos]);

  useEffect(() => {
    async function salvarPerfil() {
      try {
        await AsyncStorage.setItem(STORAGE_PERFIL, JSON.stringify(perfil));
      } catch (e) {
        console.log('Erro ao salvar perfil:', e);
      }
    }
    salvarPerfil();
  }, [perfil]);

  function adicionarGasto(novoGasto) {
    setGastos((oldGastos) => [...oldGastos, novoGasto]);
  }

  function excluirGasto(index) {
    setGastos((oldGastos) => {
      const novosGastos = [...oldGastos];
      novosGastos.splice(index, 1);
      return novosGastos;
    });
  }

  function atualizarPerfil(novoPerfil) {
    setPerfil(novoPerfil);
  }

  return (
    <AppContext.Provider
      value={{
        gastos,
        adicionarGasto,
        excluirGasto,
        perfil,
        atualizarPerfil,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
