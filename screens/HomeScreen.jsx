import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PressedCountry from '../components/PressedCountry';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { getJSON } from '../utils/getJSON';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const favorites = useSelector((state) => state.favorites.value);
  const [pressedCountry, setPressedCountry] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [seekedCountry, setSeekedCountry] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState('');

  // Fetching ALL restCountries API's countries
  useEffect(() => {
    (async () => {
      try {
        const data = await getJSON('https://restcountries.com/v3.1/all');
        const formattedData = data.map((country) => {
          const name = country.name.common;
          const flag = country.flags.png;
          return {
            name,
            flag,
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
    setError('');
  };

  const getBorderStyle = (name) => {
    if (favorites.some((el) => name === el.name)) {
      return {
        shadowColor: 'red',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.95,
        shadowRadius: 5,
      };
    }
    return;
  };

  const formatName = (name) => {
    return name.length > 15 ? name.slice(0, 15) + '...' : name;
  };

  // Displaying all the countries or seeked country
  const countries = (seekedCountry.length === 0 ? allCountries : seekedCountry)
    .sort((a, b) => new Intl.Collator().compare(a.name, b.name)) // Using Intl API to sort countries name
    .map((country, i) => {
      const name = country.name;
      const formattedName = formatName(name);
      const image = country.flag;
      const favoBorderStyle = getBorderStyle(name);

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

  // Fetch country by name
  const handleSubmit = async (country) => {
    try {
      if (!inputValue || !inputValue.trim()) {
        setError('Empty field, please enter a country name.');
      }
      const data = await getJSON(
        `https://restcountries.com/v3.1/name/${country}`
      );

      const formattedData = data.map((country) => {
        const name = country.name.common;
        const flag = country.flags.png;
        return {
          name: name,
          flag: flag,
        };
      });
      setSeekedCountry(formattedData);
      setInputValue('');
      setError('');
    } catch (error) {
      console.error(error.message);
    }
  };

  // Reset seeked country
  const handleReset = () => {
    setSeekedCountry([]);
  };

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

      <TextInput
        style={styles.input}
        placeholder="Enter a country name"
        onChangeText={(value) => setInputValue(value)}
        value={inputValue}
      />
      <TouchableOpacity style={styles.inputButton}>
        <Text style={styles.inputText} onPress={() => handleSubmit(inputValue)}>
          Search
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {seekedCountry.length !== 0 && (
        <TouchableOpacity style={styles.inputButton}>
          <Text style={styles.inputText} onPress={() => handleReset()}>
            Back to All Countries ⬅️
          </Text>
        </TouchableOpacity>
      )}

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
    marginTop: 50,
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
  input: {
    backgroundColor: '#e2e6e2',
    borderRadius: 5,
    padding: 10,
    marginTop: 35,
    width: 170,
  },
  inputButton: {
    backgroundColor: '#e2e6e2',

    borderRadius: 5,
    marginTop: 10,
  },
  inputText: {
    padding: 10,
  },
  errorText: {
    marginTop: 3,
    color: 'red',
    fontSize: 17,
  },
});
