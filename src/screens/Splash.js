import React, {useEffect} from 'react';
import {View, StyleSheet, Image,StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
        <StatusBar
        backgroundColor="#05B681"
        barStyle="light-content"
        hidden={false}
      />
      <Animatable.Image animation="bounceInUp"
        source={require('../assets/images/pngtree-cooking-logo-png-image_6601988.png')}
        style={styles.image}
      />
      < Animatable.Text animation="bounceInUp" style={styles.text}>RecipePro</Animatable.Text>
      < Animatable.Text animation="bounceInUp" style={styles.text1}>Search Any Recipe with Health Filters</Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#05B681',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    marginTop:150,
    width: 250,
    height: 250,
  },
  text: {
    fontSize: 37,
    color: 'white',
    fontWeight:'900',
  },
  text1: {
    fontSize: 13,
    color: 'white',
  },
});

export default Splash;
