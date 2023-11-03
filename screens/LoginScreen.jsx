import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const image = require('../assets/background.png');

export default function LoginScreen({ navigation }) {
  return (
    <ImageBackground style={styles.background} source={image}>
      <Text style={styles.text}>Do you want to discover Geo App?</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={() => navigation.navigate('TabNavigator')}
      >
        <Text style={styles.buttonText}>Click Here</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 40,
  },
  buttonText: {
    fontSize: 20,
  },
  button: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
