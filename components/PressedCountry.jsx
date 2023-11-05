import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { addFavorite, removeFavorite } from '../reducers/favorites';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

export default function PressedCountry(props) {
  const favorites = useSelector((state) => state.favorites.value);
  const [isLiked, setIsLiked] = useState(false);
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

  // Adding country to favorites
  const handleFavorite = (data) => {
    if (props.isFavorite) {
      dispatch(removeFavorite(data));
      setIsLiked(false);
    } else {
      dispatch(addFavorite(data));
      setIsLiked(true);
    }
  };

  let heartIcon = '';
  if (favorites.some((country) => name === country.name)) {
    heartIcon = 'heart';
  } else {
    heartIcon = 'heart-o';
  }

  return (
    <View style={styles.pressedCountryCard}>
      <Image source={{ uri: flag }} style={styles.pressedCountryFlag} />
      <Text style={styles.pressedCountryTitle}>{name}</Text>
      <Text style={styles.pressedCountryOfficial}>{official}</Text>
      <View style={styles.pressedCountryInfoBlock}>
        <Text style={styles.pressedCountryText}>
          Capital : <Text style={styles.insideText}>{capital}</Text>
        </Text>
        <Text style={styles.pressedCountryText}>
          Area : <Text style={styles.insideText}>{area} km²</Text>
        </Text>
        <Text style={styles.pressedCountryText}>
          Continent : <Text style={styles.insideText}>{continent}</Text>
        </Text>
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
          million(s) people
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleFavorite(props)}>
        <FontAwesomeIcon name={heartIcon} size={40} style={styles.like} />
      </TouchableOpacity>
      {isLiked && <Text style={styles.likeText}>Added to favorites 🫶🏼</Text>}
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 130,
    margin: -1,
  },
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pressedCountryCard: {
    alignItems: 'center',
  },
  pressedCountryFlag: {
    width: width / 2,
    height: height / 5,
    marginBottom: 20,
    borderWidth: 1 / 3,
  },
  pressedCountryTitle: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Ubuntu_400Regular',
  },
  pressedCountryText: {
    fontSize: width / 23,
    marginTop: 5,
    fontFamily: 'Ubuntu_400Regular',
  },
  pressedCountryInfoBlock: {
    marginTop: 20,
    width: width / 1.5,
    heigth: height / 3,
  },
  insideText: {
    fontWeight: 'bold',
    color: 'rgb(205,152,132)',
  },
  pressedCountryOfficial: {
    textAlign: 'center',
    paddingTop: 7,
    fontFamily: 'Ubuntu_400Regular',
  },
  like: {
    color: 'red',
    marginTop: 10,
  },
  likeText: {
    textAlign: 'center',
    marginTop: 9,
    fontSize: 20,
    fontFamily: 'Ubuntu_400Regular',
  },
});
