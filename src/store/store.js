import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './user/userSlice';
const commonConfig={
   key: 'ggclassroom/user',
   storage
}

const userConfig={
  ...commonConfig,
  whitelish: ['isLoggin','token']
}

export const store = configureStore({
  reducer: {
     user: persistReducer(userConfig,userSlice)
  },
});

export const persistor= persistStore(store);
