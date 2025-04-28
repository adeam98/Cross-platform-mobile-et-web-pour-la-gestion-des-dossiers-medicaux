import React, { useState } from 'react';
import { View, ScrollView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AcceuilScreen = () => {
  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.logoContainer}>
          <Text style={Styles.logo}>Health</Text>
          <View style={Styles.logoUnderline} />
          <Text style={Styles.souslogo}>Votre santé, notre engagement</Text>
        </View>
        <View style={Styles.content}>
          <TouchableOpacity style={Styles.button} activeOpacity={0.7}>
            <Text style={Styles.text}>CONSULTER RDV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.button} activeOpacity={0.7}>
            <Text style={Styles.text}>Consulter les maladies enregistrées</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.button} activeOpacity={0.7}>
            <Text style={Styles.text}>Consulter les rapports de consultation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.button} activeOpacity={0.7}>
            <Text style={Styles.text}>Consulter les résultats d'analyse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.button} activeOpacity={0.7}>
            <Text style={Styles.text}>Consulter les analyses prescrites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.button} activeOpacity={0.7}>
            <Text style={Styles.text}>Consulter les médicaments prescrits</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoUnderline: {
    height: 4,
    width: 100,
    backgroundColor: '#0cd15a',
    marginTop: 18,
    marginBottom: 12,
    borderRadius: 2,
  },
  logo: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    color: '#0cd15a',
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    textShadowColor: '#58b2b0', // ombre cyan
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    // effet visuel de glow subtil
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  souslogo: {
    fontSize: 16,
    color: 'black',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#0cd15a',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    color: '#343a40',
    fontWeight: '700',
    flex: 1,
  },
});
export default AcceuilScreen;
