import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cin: '',
    telephone: '',
    adresse: '',
    dateNaissance: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
  
    if (!formData.email || !formData.password) {
      Alert.alert('Erreur', 'Email et mot de passe sont obligatoires');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/register', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        nom: formData.nom,
        prenom: formData.prenom,
        cin: formData.cin,
        telephone: formData.telephone,
        adresse: formData.adresse,
        specialite: '',
      });
  
      Alert.alert('Succès', 'Compte créé avec succès');
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de l\'inscription');
      } else {
        Alert.alert('Erreur', 'Une erreur inattendue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.logo}>Health</Text>
          <Text style={styles.subtitleText}>Créez votre compte</Text>
        </View>

        <View style={styles.formContainer}>
          {[ 
            {label: 'Nom', field: 'nom'},
            {label: 'Prénom', field: 'prenom'},
            {label: 'CIN', field: 'cin'},
            {label: 'Téléphone', field: 'telephone', keyboardType: 'phone-pad'},
            {label: 'Adresse', field: 'adresse'},
            {label: 'Date de naissance', field: 'dateNaissance'},
            {label: 'Email', field: 'email', keyboardType: 'email-address'},
            {label: 'Mot de passe', field: 'password', secure: true},
            {label: 'Confirmation du mot de passe', field: 'confirmPassword', secure: true},
          ].map((item, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                style={styles.inputField}
                placeholder={item.label}
                placeholderTextColor="#a0aec0"
                value={formData[item.field]}
                onChangeText={(text) => handleInputChange(item.field, text)}
                secureTextEntry={item.secure || false}
                keyboardType={item.keyboardType || 'default'}
              />
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.registerButtonText}>S'inscrire</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

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