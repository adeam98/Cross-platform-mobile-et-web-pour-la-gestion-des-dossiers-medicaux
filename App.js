import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { logout } from './components/authHelpers';
import CreateAccount from './screens/CreateAccount';
import Analysep from './screens/analysep';
import Analyser from './screens/analyser';
import Card from './screens/card';
import Consultation from './screens/consultation';
import Home from './screens/home';
import Login from './screens/login';
import Maladie from './screens/maladie';
import Medicament from './screens/medicament';
import Rdv from './screens/rdv';

// Import AddCardScreen for Premium page

const Stack = createStackNavigator();

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51N4k1dK0b2Y52b1z5Z3Q0d4f5Y6Z7X8Y">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />

          {}
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => logout(navigation)} style={{ marginRight: 16 }}>
                  <Feather name="log-out" size={24} color="#0cd15a" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Maladie"
            component={Maladie}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => logout(navigation)} style={{ marginRight: 16 }}>
                  <Feather name="log-out" size={24} color="#0cd15a" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Rdv"
            component={Rdv}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => logout(navigation)} style={{ marginRight: 16 }}>
                  <Feather name="log-out" size={24} color="#0cd15a" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Medicament"
            component={Medicament}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => logout(navigation)} style={{ marginRight: 16 }}>
                  <Feather name="log-out" size={24} color="#0cd15a" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Consultation"
            component={Consultation}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => logout(navigation)} style={{ marginRight: 16 }}>
                  <Feather name="log-out" size={24} color="#0cd15a" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Analyser"
            component={Analyser}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => logout(navigation)} style={{ marginRight: 16 }}>
                  <Feather name="log-out" size={24} color="#0cd15a" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Analysep"
            component={Analysep}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => logout(navigation)} style={{ marginRight: 16 }}>
                  <Feather name="log-out" size={24} color="#0cd15a" />
                </TouchableOpacity>
              ),
            })}
          />

          {/* Added Premium screen here */}
          <Stack.Screen
            name="Card"
            component={Card}
            options={{
              title: 'Add Payment Card',
              headerTintColor: '#ff416c',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
