import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider } from './contexts/AppContext';
import ResumoScreen from './screens/ResumoScreen';
import NovoGastoScreen from './screens/NovoGastoScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import PerfilScreen from './screens/PerfilScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Resumo') iconName = 'pie-chart';
              else if (route.name === 'NovoGasto') iconName = 'add-circle';
              else if (route.name === 'Historico') iconName = 'list';
              else if (route.name === 'Perfil') iconName = 'person';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Resumo" component={ResumoScreen} />
          <Tab.Screen name="NovoGasto" component={NovoGastoScreen} />
          <Tab.Screen name="Historico" component={HistoricoScreen} />
          <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
