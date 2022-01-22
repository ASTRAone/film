import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  TextInput,
} from 'react-native';

import {fetchFilms} from '../actions/film.actions';
import {useDispatch, useSelector} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNavigation} from '@react-navigation/native';

import {UnexpectedError} from '../components/UnxpectedError';

// Сделать норм импорты
const FilmItem = ({Poster, Title, Year, imdbID}) => {
  const navigation = useNavigation();
  const defaultPoster =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pziTMjXmjGVZa15YXUXcnPOo0p8FKxxu6aefFt-AD2DJnwH8DsG6VmSFht6zWL3Uzbw&usqp=CAU';

  const poster = Poster !== 'N/A' ? Poster : defaultPoster;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FilmCardScreen', {id: imdbID})}
      style={styles.containerItem}>
      <Image source={{uri: poster}} style={{width: 100, height: 150}} />
      <View style={styles.contentItem}>
        <Text style={styles.itemTitle}>{Title}</Text>
        <Text style={styles.itemText}>
          {`Release date: `}
          <Text style={{color: 'gray'}}>{Year}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const FilmScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const films = useSelector(state => state.films);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [value, setValue] = useState('');

  const filteredFilms = films.data.filter(film => {
    return film.Title.toLowerCase().includes(value.toLocaleLowerCase());
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchFilms())
      .then(unwrapResult)
      .catch(() => setError(true))
      .finally(() => (setRefreshing(false), setError(false)));
  }, []);

  useEffect(() => {
    if (!films.data.length) {
      onRefresh();
    }
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <UnexpectedError onRefresh={onRefresh} />
      ) : (
        <>
          <View style={{marginTop: 10}}>
            <TextInput
              placeholder="Поиск"
              placeholderTextColor="white"
              style={styles.input}
              value={value}
              onChangeText={setValue}
            />
          </View>
          {filteredFilms.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Мы ничего не нашли...</Text>
            </View>
          ) : (
            <FlatList
              style={{
                marginTop: 10,
              }}
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              data={filteredFilms}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => <FilmItem key={index} {...item} />}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272b30',
    paddingHorizontal: 10,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentItem: {
    marginLeft: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 18,
    flexDirection: 'row',
    width: 200,
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  itemText: {
    color: 'white',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'white',
  },
});
