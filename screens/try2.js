import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

const RegisterScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.logo}>Health</Text>
          <Text style={styles.subtitleText}>Créez votre compte</Text>
        </View>

        <View style={styles.formContainer}>
          {[
            'Nom',
            'Prénom',
            'CIN',
            'Téléphone',
            'Adresse',
            'Date de naissance',
            'Email',
            'Mot de passe',
            'Confirmation du mot de passe',
          ].map((placeholder, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{placeholder}</Text>
              <TextInput
                style={styles.inputField}
                placeholder={placeholder}
                placeholderTextColor="#a0aec0"
              />
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Connectez-vous</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0cd15a',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6b7280',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginBottom: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputField: {
    backgroundColor: '#f9fafb',
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 12,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    color: '#111827',
  },
  buttonContainer: {
    marginTop: 16,
  },
  registerButton: {
    backgroundColor: '#0cd15a',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  registerButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0cd15a',
  },
});

export default RegisterScreen;
