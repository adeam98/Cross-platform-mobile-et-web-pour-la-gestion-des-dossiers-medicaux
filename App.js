import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CreateAccount from './screens/CreateAccount';
import Analysep from './screens/analysep'; // capitalized
import Analyser from './screens/analyser'; // capitalized
import Consultation from './screens/consultation'; // capitalized
import Home from './screens/home'; // capitalized
import Login from './screens/login'; // capitalized
import Maladie from './screens/maladie'; // capitalized
import Medicament from './screens/medicament'; // capitalized
import Rdv from './screens/rdv'; // capitalized
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Maladie" component={Maladie} />
        <Stack.Screen name="Rdv" component={Rdv} />
        <Stack.Screen name="Medicament" component={Medicament} />
        <Stack.Screen name="Consultation" component={Consultation} />
        <Stack.Screen name="Analyser" component={Analyser} />
        <Stack.Screen name="Analysep" component={Analysep} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
