import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,StatusBar,
} from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getDatabase();
    Favorites();
  }, [getDatabase]);

  const getDatabase = useCallback(async () => {
    try {
      const snapshot = await database().ref('/Recipe').once('value');
      setLoading(false);
      if (snapshot.exists()) {
        setData(snapshot.val());
        console.log('Fetched data:', snapshot.val());
      } else {
        console.log('No data available');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, []);

// maintain heart color
  const Favorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const onFavorite = async item => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = favorites ? JSON.parse(favorites) : [];
      console.log('Current favorites:', favorites);

      const isAlreadyFavorite = favorites.some(
        favorite => JSON.stringify(favorite) === JSON.stringify(item),
      );

      if (!isAlreadyFavorite) {
        favorites.push(item);
        console.log('Item added to favorites:', item);
      } else {
        favorites = favorites.filter(
          fav => JSON.stringify(fav) !== JSON.stringify(item),
        );
        console.log('Item removed from favorites:', item);
      }
      
      setFavorites(favorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  const isFavorite = item => {
    return favorites.some(fav => JSON.stringify(fav) === JSON.stringify(item));
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Detail', {item})}>
      <View style={styles.heartContainer}>
        <TouchableOpacity onPress={() => onFavorite(item)}>
          <Image
            source={
              isFavorite(item)
                ? require('../assets/images/color.png')
                : require('../assets/images/heart.png')
            }
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </View>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text numberOfLines={1} style={styles.itemTitle}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
        <StatusBar
        backgroundColor="#181818"
        barStyle="light-content"
        hidden={false}
      />
      <Text style={styles.text}>Find the same recipe for yourself</Text>
      <View style={styles.transparentView}>
        <View style={styles.searchBox}>
          <TouchableOpacity style={styles.searchButton}>
            <Image
              source={require('../assets/images/search.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search for recipes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#DAA520" />
      ) : (
        <FlatList
          numColumns={2}
          data={filteredData}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          extraData={favorites}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    marginTop: 40,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  transparentView: {
    borderWidth: 1,
    borderColor: 'white',
    width: '89%',
    paddingVertical: 10,
    marginBottom: 6,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  searchBox: {
    // flexDirection: 'row',
    // height: 25,
    // alignItems: 'center', 
    // borderRadius: 8,


    flexDirection: 'row',
  height: 30, // Adequate height for the search bar
  alignItems: 'center', // Vertically align items in the center
  borderRadius: 5,
  paddingHorizontal: 8,
  },
  input: {
    marginRight: 150,
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  searchIcon: {
    width: 24,
    tintColor: '#DAA520',
    marginTop: 2,
    marginLeft: 40,
    height: 24,
  },
  itemContainer: {
    backgroundColor: '#181818',
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 15,
    width: 152,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  itemTitle: {
    textAlign: 'center',
    color: 'white',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  flatListContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  heartContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  heartIcon: {
    tintColor: '#DAA520',
    width: 24,
    height: 24,
  },
});

export default Home;
