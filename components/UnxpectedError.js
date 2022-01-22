import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export const UnexpectedError = ({onRefresh}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <Text style={styles.containerText}>
          Произошла ошибка, попробуйте позже
        </Text>
        <TouchableOpacity style={styles.contentBtn} onPress={() => onRefresh()}>
          <Text style={styles.contentBtnText}>Обновить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerContent: {
    alignItems: 'center',
  },
  containerText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 25,
  },
  contentBtn: {
    width: 250,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBtnText: {
    color: 'black',
    fontSize: 16,
  },
});
