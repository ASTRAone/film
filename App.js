import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {InitialStack} from './navigation/Stack';
import {Provider} from 'react-redux';
import store from './store/configurationStore';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <InitialStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
