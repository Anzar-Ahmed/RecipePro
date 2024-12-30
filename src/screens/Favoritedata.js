import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.itemTitle}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#181818" barStyle="light-content" />
      <Text style={styles.text}>Your Favorite Recipes</Text>
      {favorites.length > 0 ? (
        <FlatList
          numColumns={2}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text style={styles.emptyMessage}>No favorites yet!</Text>
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
  itemContainer: {
    backgroundColor: '#181818',
    marginBottom: 16,
    marginHorizontal: 8,
    borderRadius: 15,
    width: 152,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
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
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Favorites;
