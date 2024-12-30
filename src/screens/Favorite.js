import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

// const FavoritesScreen = ({Navigation}) => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     storeFavorites();
//   }, []);

//   const storeFavorites = async () => {
//     try {
//       const storedFavorites = await AsyncStorage.setItem('favorites');
//       if (storedFavorites !== null) {
//         setFavorites(JSON.parse(storedFavorites));
//       }
//     } catch (error) {
//       console.error('Error fetching favorites:', error);
//     }
//   };

// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 24,
//     color: 'white',
//     marginBottom: 30,
//     fontWeight: 'bold',
//   },

//   itemContainer: {
//     backgroundColor: '#181818',
//     marginBottom: 16,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     height: 200,
//   },
//   itemTitle: {
//     textAlign: 'center',
//     color: 'white',
//     marginTop: 8,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
// });

// export default FavoritesScreen;
