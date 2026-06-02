import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HandbookScreen from './screens/HandbookScreen';
import QuizScreen from './screens/QuizScreen';
import SimulatorScreen from './screens/SimulatorScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0.5,
            borderTopColor: '#E5E7EB',
            height: 60,
            paddingBottom: 8,
          },
          headerStyle: { backgroundColor: '#2563EB' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Tab.Screen
          name="Handbook"
          component={HandbookScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📖</Text>,
            tabBarLabel: 'Handbook',
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📝</Text>,
            tabBarLabel: 'Quiz',
          }}
        />
        <Tab.Screen
          name="Simulator"
          component={SimulatorScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🚗</Text>,
            tabBarLabel: 'Simulator',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}