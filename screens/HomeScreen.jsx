import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [allCountries, setAllCountries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressedCountry, setPressedCountry] = useState([]);

  // Function who fetch API and converts data to JSON
  const getJSON = async (url, errorMsg = 'Something went wrong...') => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(errorMsg);
    return await res.json();
  };

  // Fetching ALL restCountries API's countries
  useEffect(() => {
    (async () => {
      const data = await getJSON('https://restcountries.com/v3.1/all');
      const formattedData = data.map((country) => {
        const name = country.name.common;
        const flag = country.flags.png;
        return {
          name: name,
          flag: flag,
        };
      });
      setAllCountries(formattedData);
    })();
  }, []);

  // Fetching the pressed country data
  const fetchCountryData = async (name) => {
    try {
      const data = await getJSON(`https://restcountries.com/v3.1/name/${name}`);

      const formattedData = data.map((country) => {
        const name = country.name.common;
        const flag = country.flags.png;
        const continent = country.continents[0];
        const official = country.name.official;
        const capital = country.capital;
        const currency = Object.values(country.currencies);
        const language = Object.values(country.languages);
        const area = country.area;
        const population = country.population;

        return {
          name: name,
          flag: flag,
          continent: continent,
          official: official,
          capital: capital,
          currency: currency[0].name,
          language: language[0],
          area: area.toLocaleString(),
          population: population,
        };
      });
      setPressedCountry(formattedData);
      setModalVisible(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Displaying all the countries
  const countries = allCountries.map((country, i) => {
    const name = country.name;
    const formattedName =
      country.name.length > 15
        ? country.name.slice(0, 15) + '...'
        : country.name;
    const image = country.flag;

    return (
      <TouchableOpacity
        key={i}
        style={styles.countryCard}
        onPress={() => fetchCountryData(name)}
      >
        <Text style={styles.countryName}>{formattedName}</Text>
        <Image style={styles.countryFlag} source={{ uri: image }}></Image>
      </TouchableOpacity>
    );
  });

  // Displaying pressed country
  const country = pressedCountry.map((el, i) => {
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
    } = el;

    return (
      <View key={i} style={styles.pressedCountryCard}>
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
            millions people
          </Text>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GEO APP</Text>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalView}>{country}</View>
        </TouchableOpacity>
      </Modal>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    marginTop: 130,
  },
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  countryCard: {
    backgroundColor: '#fdfdfd',
    height: 200,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 6,
  },
  countryFlag: {
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 5,
  },
  countryName: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  pressedCountryCard: {
    alignItems: 'center',
  },
  pressedCountryFlag: {
    width: 300,
    height: 180,
    marginBottom: 30,
    borderWidth: 1 / 3,
  },
  pressedCountryTitle: {
    fontSize: 40,
    textAlign: 'center',
  },
  pressedCountryText: {
    fontSize: 20,
    marginVertical: 5,
  },
  pressedCountryInfoBlock: {
    marginTop: 60,
  },
  insideText: {
    fontWeight: 'bold',
    color: 'rgb(205,152,132)',
  },
  pressedCountryOfficial: {
    textAlign: 'center',
    paddingTop: 7,
  },
});
