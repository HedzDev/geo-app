import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useFonts, Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';

const image = require('../assets/background.png');

export default function LoginScreen({ navigation }) {
  // Setting special font
  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
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
    fontFamily: 'Ubuntu_400Regular',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Ubuntu_400Regular',
  },
  button: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
