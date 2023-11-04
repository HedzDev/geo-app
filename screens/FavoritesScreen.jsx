import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../reducers/favorites';
import FavoriteCard from '../components/FavoriteCard';

export default function FavoritesScreen() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  console.log(favorites);

  // const handleRemoveFavorite = (name) => {
  //   dispatch(removeFavorite(name));
  // };

  // Displaying favorites countries
  const countries = favorites.map((el, i) => {
    return <FavoriteCard key={i} {...el} />;
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
