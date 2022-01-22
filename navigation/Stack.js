import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {FilmScreen} from '../screens/FilmsScreen';
import {FilmCardScreen} from '../screens/FilmCardScreen';

const Stack = createStackNavigator();

export const InitialStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FilmScreen"
        component={FilmScreen}
        options={{
          title: 'Список фильмов',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#272b30',
            borderBottomColor: 'rgba(0, 0, 0, 0.6)',
          },
          headerTitleStyle: {
            color: 'white',
          },
        }}
      />

      <Stack.Screen
        name="FilmCardScreen"
        component={FilmCardScreen}
        options={{
          title: 'О фильме',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#272b30',
            borderBottomColor: 'rgba(0, 0, 0, 0.6)',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('FilmScreen')}>
              <Icon name="arrow-left" size={20} style={styles.arrow} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  arrow: {
    color: 'white',
    paddingLeft: 20,
  },
});
