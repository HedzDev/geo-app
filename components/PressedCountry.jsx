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

  const { width, height } = Dimensions.get('window');
  const flagWidth = width / 2;
  const flagHeight = height / 5;
  const titleFontSize = width / 12;
  const textFontSize = width / 23;
  const infoBlockWidth = width / 1.5;

  return (
    <View style={styles.pressedCountryCard}>
      <Image
        source={{ uri: flag }}
        style={[
          styles.pressedCountryFlag,
          { width: flagWidth, height: flagHeight },
        ]}
      />
      <Text style={[styles.pressedCountryTitle, { fontSize: titleFontSize }]}>
        {name}
      </Text>
      <Text style={styles.pressedCountryOfficial}>{official}</Text>
      <View style={[styles.pressedCountryInfoBlock, { width: infoBlockWidth }]}>
        <Text style={[styles.pressedCountryText, { fontSize: textFontSize }]}>
          Capital : <Text style={styles.insideText}>{capital}</Text>
        </Text>
        <Text style={[styles.pressedCountryText, { fontSize: textFontSize }]}>
          Area : <Text style={styles.insideText}>{area} km²</Text>
        </Text>
        <Text style={[styles.pressedCountryText, { fontSize: textFontSize }]}>
          Continent : <Text style={styles.insideText}>{continent}</Text>
        </Text>
        <Text style={[styles.pressedCountryText, { fontSize: textFontSize }]}>
          💰 <Text style={styles.insideText}>{currency}</Text>
        </Text>
        <Text style={[styles.pressedCountryText, { fontSize: textFontSize }]}>
          🗣️ <Text style={styles.insideText}>{language}</Text>
        </Text>
        <Text style={[styles.pressedCountryText, { fontSize: textFontSize }]}>
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
    marginBottom: 20,
    borderWidth: 1 / 3,
  },
  pressedCountryTitle: {
    textAlign: 'center',
    fontFamily: 'Ubuntu_400Regular',
  },
  pressedCountryText: {
    marginTop: 5,
    fontFamily: 'Ubuntu_400Regular',
  },
  pressedCountryInfoBlock: {
    marginTop: 20,
    heigth: 'auto',
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
