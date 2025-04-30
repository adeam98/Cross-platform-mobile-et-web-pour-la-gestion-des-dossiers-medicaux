import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';

import { loginUser } from '../services/authService';
Dimensions.get('window');
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const navigation = useNavigation();
  // Animation values
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonColor = useRef(new Animated.Value(0)).current;
  const buttonElevation = useRef(new Animated.Value(5)).current;

  const handleLogin = async () => {
    console.log('handleLogin called');

    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    try {
      console.log('Sending login request', { email, password });

      const res = await loginUser({ email, password });

      console.log('Response:', res);

      if (!res || res.status !== 200) {
        console.log('Login failed', res?.data?.message || 'Unknown error');
        Alert.alert('Erreur', res?.data?.message || 'Erreur inconnue');
        return;
      }

      const data = res.data;
      console.log('Login successful:', data);
      await AsyncStorage.setItem('userId', data.user.id_user.toString()); // convert to string
      await AsyncStorage.setItem('userToken', data.token);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);

      if (error.response) {
        Alert.alert(
          'Erreur',
          `Réponse serveur: ${error.response.status} - ${error.response.data.message || ''}`
        );
      } else if (error.request) {
        Alert.alert('Erreur', 'Aucune réponse du serveur.');
      } else {
        Alert.alert('Erreur', `Erreur lors de la préparation de la requête: ${error.message}`);
      }
    }
  };

  const buttonBackgroundColor = buttonColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0cd15a', '#0aa84a'],
  });

  const handleFocus = (field) => setIsFocused({ ...isFocused, [field]: true });
  const handleBlur = (field) => setIsFocused({ ...isFocused, [field]: false });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header avec logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>Health</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre espace</Text>
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, isFocused.email && styles.inputFocused]}
              placeholder="votre@email.com"
              placeholderTextColor="#a0aec0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mot de passe</Text>
            <TextInput
              style={[styles.input, isFocused.password && styles.inputFocused]}
              placeholder="••••••••"
              placeholderTextColor="#a0aec0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
            <Animated.View
              style={[
                styles.loginButton,
                {
                  transform: [{ scale: buttonScale }],
                  backgroundColor: buttonBackgroundColor,
                  elevation: buttonElevation,
                  shadowOpacity: buttonElevation.interpolate({
                    inputRange: [2, 5],
                    outputRange: [0.2, 0.3],
                  }),
                },
              ]}>
              <View style={styles.buttonInner}>
                <Text style={styles.loginButtonText}>Se connecter</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Footer avec option d'inscription */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Vous n'avez pas de compte ? </Text>
          <TouchableOpacity>
            <Text style={styles.registerText} onPress={() => navigation.navigate('CreateAccount')}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0cd15a',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#4a5568',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    color: '#1a202c',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputFocused: {
    borderColor: '#0cd15a',
    shadowColor: '#0cd15a',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0cd15a',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    paddingVertical: 18,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0cd15a',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
  },
  buttonInner: {
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#718096',
    fontSize: 14,
  },
  registerText: {
    color: '#0cd15a',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default LoginScreen;
