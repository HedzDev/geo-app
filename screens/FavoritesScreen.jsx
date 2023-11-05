import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FavoriteCard from '../components/FavoriteCard';
import { useSelector } from 'react-redux';
import React from 'react';

export default function FavoritesScreen() {
  const favorites = useSelector((state) => state.favorites.value);

  // Displaying favorites countries
  const countries = favorites.map((data, i) => {
    const isFavorite = favorites.some((country) => country.name === data.name);
    return <FavoriteCard key={i} {...data} isFavorite={isFavorite} />;
  });

  const { width, height } = Dimensions.get('window');
  const scale = Math.min(width / 375, height / 812);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgb(74,98,92)', 'rgb(18,25,22)']}
        style={styles.background}
      />
      <Text style={[styles.title, { fontSize: 40 * scale }]}>Geopedia</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.countriesContainer}
      >
        {favorites.length > 0 ? (
          countries
        ) : (
          <Text
            style={[
              styles.infoText,
              { marginTop: '60%', fontSize: 25 * scale },
            ]}
          >
            No favorites countries yet 😀 !
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(153,173,165)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '200%',
  },
  title: {
    fontFamily: 'Ubuntu_400Regular',
    color: '#6aaf92',
    shadowColor: '#7C5F6B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 2,
    elevation: 5,
  },
  scrollView: {
    marginTop: 15,
    width: '100%',
  },
  countriesContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 25,
    fontFamily: 'Ubuntu_400Regular',
    color: '#95e5c4',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 2,
    padding: 10,
    borderColor: 'rgb(205,152,132)',
  },
});
