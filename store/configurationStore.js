import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import initialState from './initialState';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';

import { FilmReducer } from '../reducers/film.reducer';

const reducer = combineReducers({
  films: FilmReducer.reducer,
});

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
});

export default store;