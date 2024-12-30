import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Details = ({ route }) => {
  const { item } = route.params;
  const ingredients = item.ingredient;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.infoContainer}>
        <Image
          source={require('../assets/images/clock.png')}
          style={styles.icon}
        />
        <Text style={styles.infoText}>{item.time}</Text>
      </View>
      <View style={styles.ingredient}>
        <Text style={styles.ingritext}>Ingredients:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {Object.keys(ingredients).map(key => (
            <Image
              key={key}
              source={{ uri: ingredients[key].image }}
              style={styles.tinyLogo}
            />
          ))}
        </ScrollView>
        <Text style={{fontSize:15, color:'white', marginLeft:20,  marginTop:15}}>How to make (step by step)</Text>
        <View style={styles.instruction1}>
          <Text style={styles.instruction}>{item.instruction}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position:'relative',
  },
  backIconContainer: {
    position: 'absolute',
    height:40,
    width:75,
    borderRadius:15,
    backgroundColor:'red',
    left: 290,
  },
  backIcon: {
    marginLeft:25,
    marginTop:8,
    width: 25,
    height: 25,
    tintColor: '#DAA520',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 110,
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#DAA520',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: 'white',
  },
  ingredient: {
    marginBottom: 16,
  },
  tinyLogo: {
    height: 65,
    width: 65,
    backgroundColor: '#181818',
    borderRadius: 50,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  ingritext: {
    fontSize: 15,
    marginVertical: 5,
    marginTop:20,
    marginBottom:10,
    marginLeft: 20,
    fontWeight: '600',
    color: 'white',
  },
  instruction: {
    marginTop: 10,
    marginBottom:8,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20,
    marginHorizontal: 17,
    color: 'white',
  },
  instruction1: {
    shadowColor: 'white',
    backgroundColor: '#181818',
    width: 360,
    height: "auto",
    shadowOffset: { width: 0, height: 0 },
    marginVertical: 15,
    marginHorizontal: 16,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
  },
});

export default Details;
