import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { removeFavorite } from '../reducers/favorites';
import { useDispatch } from 'react-redux';
import React from 'react';

export default function FavoriteCard(props) {
  const dispatch = useDispatch();
  const {
    currency,
    language,
    continent,
    area,
    population,
    official,
    capital,
    name,
    flag,
  } = props;

  const handleRemoveFavorite = (data) => {
    dispatch(removeFavorite(data));
  };

  return (
    <View style={styles.pressedCountryCard}>
      <View style={styles.topCountryCard}>
        <Image source={{ uri: flag }} style={styles.pressedCountryFlag} />
        <Text style={styles.pressedCountryTitle}>{name}</Text>
        <Text style={styles.pressedCountryOfficial}>{official}</Text>
      </View>
      <View style={styles.pressedCountryInfoBlock}>
        <View>
          <Text style={styles.pressedCountryText}>
            Capital : <Text style={styles.insideText}>{capital}</Text>
          </Text>
          <Text style={styles.pressedCountryText}>
            Area : <Text style={styles.insideText}>{area} km²</Text>
          </Text>
          <Text style={styles.pressedCountryText}>
            Continent : <Text style={styles.insideText}>{continent}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.pressedCountryText}>
            💰 <Text style={styles.insideText}>{currency}</Text>
          </Text>
          <Text style={styles.pressedCountryText}>
            🗣️ <Text style={styles.insideText}>{language}</Text>
          </Text>
          <Text style={styles.pressedCountryText}>
            👫{' '}
            <Text style={styles.insideText}>
              {(+population / 1000000).toFixed(2)}
            </Text>{' '}
            M. people
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveFavorite(props)}>
        <FontAwesomeIcon name="heart" size={40} style={styles.like} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topCountryCard: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  pressedCountryCard: {
    backgroundColor: '#eff1ef',
    borderRadius: 10,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    width: '90%',
  },
  pressedCountryFlag: {
    width: 100,
    height: 70,
    borderWidth: 1 / 3,
  },
  pressedCountryTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Ubuntu_400Regular',
  },
  pressedCountryText: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'Ubuntu_400Regular',
  },
  pressedCountryInfoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 14,
    fontFamily: 'Ubuntu_400Regular',
  },
  insideText: {
    fontWeight: 'bold',
    color: 'rgb(205,152,132)',
  },
  pressedCountryOfficial: {
    textAlign: 'center',
    fontFamily: 'Ubuntu_400Regular',
  },
  like: {
    color: 'red',
    marginVertical: 20,
    textAlign: 'center',
  },
});
