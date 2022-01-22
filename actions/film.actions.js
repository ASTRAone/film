import {customAxios} from '../utility/customAxios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchFilms = createAsyncThunk(
  'fetchFilms',
  async (_, {rejectWithValue}) => {
    try {
      const response = await customAxios.get('?s=inception&apikey=eaf288a9');
      console.log('fetchFilms ', response);
      return {
        data: response.data.Search,
      };
    } catch (error) {
      logTheEvent('Error', 'fetchFilms', error.response || error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchCardFilm = createAsyncThunk(
  'fetchCardVariety',
  async (id, {rejectWithValue}) => {
    try {
      const response = await customAxios.get(`?i=${id}&apikey=eaf288a9`);
      console.log('fetchCardFilm ', response);
      return {
        data: response.data,
      };
    } catch (error) {
      logTheEvent('Error', 'fetchFilms', error.response || error);
      return rejectWithValue(error.response.data);
    }
  },
);
