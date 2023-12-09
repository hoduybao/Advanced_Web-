import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './user/userSlice';
import classSlice from './class/classSlice';

const commonConfig={
   key: 'ggclassroom/user',
   storage
}

const userConfig={
  ...commonConfig,
  whitelist: ['isLoggin','token']
}

const persistedReducer = persistReducer(userConfig, userSlice);

export const store = configureStore({
  reducer: {
     user: persistedReducer,
     class: classSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor= persistStore(store);

