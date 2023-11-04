import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GEO APP</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.countriesContainer}
      >
        {countries}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  scrollView: {
    marginTop: 15,
    width: '95%',
  },
  countriesContainer: {
    alignItems: 'center',
  },
});
