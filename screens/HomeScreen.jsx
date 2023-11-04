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
import PressedCountry from '../components/PressedCountry';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const favorites = useSelector((state) => state.favorites.value);
  const [pressedCountry, setPressedCountry] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  // Function who fetch API and converts data to JSON
  const getJSON = async (url, errorMsg = 'Something went wrong...') => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(errorMsg);
    return await res.json();
  };

  // Fetching ALL restCountries API's countries
  useEffect(() => {
    (async () => {
      try {
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
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  // Fetching the pressed country data
  const fetchCountryData = async (name) => {
    try {
      const data = await getJSON(`https://restcountries.com/v3.1/name/${name}`);

      const formattedData = data.map((country) => {
        const {
          name: { common },
          flags: { png: flag },
          continents: [continent],
          name: { official },
          capital,
          currencies,
          languages,
          area,
          population,
        } = country;

        const currency = currencies
          ? currencies[Object.keys(currencies)[0]].name
          : 'No locale currencies';
        const language = languages
          ? Object.values(languages)[0]
          : 'No locale language';

        return {
          name: common,
          flag,
          continent,
          official,
          capital,
          currency,
          language,
          area: area.toLocaleString(),
          population,
        };
      });

      setPressedCountry(formattedData);
      setModalVisible(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsLiked(false);
  };

  // Displaying all the countries
  const countries = allCountries.map((country, i) => {
    const name = country.name;
    const formattedName =
      country.name.length > 15
        ? country.name.slice(0, 15) + '...'
        : country.name;
    const image = country.flag;

    let favoBorderStyle = {};
    if (favorites.some((el) => name === el.name)) {
      favoBorderStyle = {
        shadowColor: 'red',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.95,
        shadowRadius: 5,
      };
    }

    return (
      <TouchableOpacity
        key={i}
        style={[styles.countryCard, favoBorderStyle]}
        onPress={() => fetchCountryData(name)}
      >
        <Text style={styles.countryName}>{formattedName}</Text>
        <Image style={styles.countryFlag} source={{ uri: image }}></Image>
      </TouchableOpacity>
    );
  });

  // Displaying pressed country
  const country = pressedCountry.map((data, i) => {
    const isFavorite = favorites.some((country) => country.name === data.name);
    return <PressedCountry key={i} {...data} isFavorite={isFavorite} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgb(74,98,92)', 'rgb(18,25,22)']}
        style={styles.background}
      />
      <Text style={styles.title}>Geopedia</Text>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => closeModal()}
      >
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => closeModal()}
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
    fontSize: 40,
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
    marginBottom: 30,
    margin: -1,
  },
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  countryCard: {
    backgroundColor: '#e2e6e2',
    height: 140,
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
    height: 60,
    margin: 5,
    borderRadius: 5,
    objectFit: 'contain',
  },
  countryName: {
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'Ubuntu_400Regular',
  },
});
