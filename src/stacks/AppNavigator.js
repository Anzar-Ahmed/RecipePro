import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Favorite from '../screens/Favorite';
import Favoritedata from '../screens/Favoritedata';

const Stack = createNativeStackNavigator();

// Custom Header Component
const CustomHeader = ({
  navigation,
  title,
  title2,
  img,
  isRightBtnShow,
  tintColor,
  width,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconContainer}>
        <Image
          source={require('../assets/images/arrow.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      {/* <Text style={styles.headerTitle}>{title}</Text> */}
      <View style={styles.container}>
        <Image
          source={img}
          style={[styles.image, tintColor && {tintColor: tintColor,width:width}]}
        />
        <Text>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text2}>{title2}</Text>
        </Text>
      </View>
      {isRightBtnShow ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Favoritedata')}
          style={styles.Favcontainer}>
          <Image
            source={require('../assets/images/color.png')}
            style={styles.Favicon}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 50}} />
      )}
    </View>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Favoritedata"
          component={Favoritedata}
          options={{
            header: ({navigation}) => (
              <CustomHeader
                navigation={navigation}
                title="Favo"
                title2={'rites'}
                img={require('../assets/images/heart.png')}
                tintColor={'red'}
                width={30}
              />
            ),
          }}
        />

        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            header: ({navigation}) => (
              <CustomHeader
                navigation={navigation}
                title={'RESI'}
                title2={'Pro'}
                img={require('../assets/images/pngtree-cooking-logo-png-image_6601988.png')}
                isRightBtnShow={true}
              />
            ),
          }}
        />
        {/* <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{
            header: ({navigation}) => (
              <CustomHeader navigation={navigation} title="Favorites" />
            ),
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#181818',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 8,
  },
  backIconContainer: {
    height: 45,
    width: 70,
    borderRadius: 15,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
    tintColor: '#DAA520', // Set the color of the back icon
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    borderRadius: 15,
    backgroundColor: 'black',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  image: {
    height: 50,
    width: 40,
    resizeMode: 'contain',
  },
  text: {
    color: 'yellow',
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',
  },
  text2: {
    color: 'green',
    fontWeight: '600',
    fontSize: 20,
    alignSelf: 'center',
  },
  Favcontainer: {
    backgroundColor: 'black',
    height: 43,
    width: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Favicon: {
    tintColor: '#DAA520',
    height: 24,
    width: 24,
  },
});
