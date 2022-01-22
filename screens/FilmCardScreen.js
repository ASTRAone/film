import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

import {unwrapResult} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {Loading} from '../components/Loading';
import {fetchCardFilm} from '../actions/film.actions';
import {changeTime} from '../utility/changeTime';

export const FilmCardScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [film, setFilm] = useState('');
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardFilm(id))
      .then(unwrapResult)
      .then(item => {
        setFilm(item.data);
      })
      .catch((e) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setError(false);
      });
  }, []);

  const {Actors, Director, Plot, Poster, Runtime, Title, Writer, Year} = film;

  const defaultPoster =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pziTMjXmjGVZa15YXUXcnPOo0p8FKxxu6aefFt-AD2DJnwH8DsG6VmSFht6zWL3Uzbw&usqp=CAU';

  const poster = Poster !== 'N/A' ? Poster : defaultPoster;

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Произошла ошибка загрузки фильма</Text>
        </View>
      ) : (
        <ScrollView style={{paddingHorizontal: 20}}>
          <Text style={styles.cardTitle}>{Title}</Text>
          <Text style={styles.cardTextContainer}>
            <Text>{`${Year}, `}</Text>
            <Text>{changeTime(Runtime)}</Text>
          </Text>
          <View style={styles.cardPoster}>
            <Image
              source={{uri: poster}}
              style={{width: '100%', height: 500}}
            />
          </View>
          <View style={styles.cardPlot}>
            <Text style={styles.cardPlotText}>{Plot}</Text>
          </View>
          <View style={styles.cardPeople}>
            <Text style={styles.cardPeopleTitle}>
              {`Director: `}
              <Text style={styles.cardPeopleText}>{Director}</Text>
            </Text>
            <Text style={styles.cardPeopleTitle}>
              {`Writer: `}
              <Text style={styles.cardPeopleText}>{Writer}</Text>
            </Text>
            <Text style={styles.cardPeopleTitle}>
              {`Actors: `}
              <Text style={styles.cardPeopleText}>{Actors}</Text>
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272b30',
    paddingVertical: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    flexDirection: 'row',
    width: 200,
    flexWrap: 'wrap',
  },
  cardTextContainer: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
  cardPoster: {
    marginTop: 20,
  },
  cardPlot: {
    marginTop: 10,
  },
  cardPlotText: {
    color: 'white',
    fontSize: 15,
  },
  cardPeople: {
    marginTop: 15,
  },
  cardPeopleTitle: {
    color: 'white',
    fontSize: 16,
  },
  cardPeopleText: {
    color: 'gray',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: 'red'
  },
});
