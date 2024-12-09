import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import createDebugger from 'redux-flipper';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import { reduxStorage } from '@/utils/mmkv';

import { apiSlice } from './apiSlice';
import builderReducer from './builder/builderReducer';
import businessReducer from './business/businessReducer';
import globalReducer from './global/globalReducer';
import homeReducer from './home/homeReducer';
import listingReducer from './listing/listingReducer';
import loginReducer from './login/loginReducer';
import nearuReducer from './nearu/nearuReducer';
import notificationReducer from './Notification/notificationReducer';
import onboardingReducer from './onboarding/onboardingReducer';
import propertyReducer from './property/propertyReducer';
import signupReducer from './signup/signupReducer';
import subscriptionReducer from './Subscription/subscriptionReducer';

const middleware = [apiSlice.middleware];
// middleware.push(createDebugger());

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  login: loginReducer,
  signup: signupReducer,
  business: businessReducer,
  home: homeReducer,
  listing: listingReducer,
  subscription: subscriptionReducer,
  global: globalReducer,
  nearu: nearuReducer,
  property: propertyReducer,
  notification: notificationReducer,
  onboarding: onboardingReducer,
  builder: builderReducer,
});

const persistConfig = {
  key: 'redux',
  version: 1,
  storage: reduxStorage,
  whitelist: ['login'],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// disabled this line because of this is only useful in the test cases
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupStore = (preloadedState: any) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middleware),
  });

export const store = setupStore({});

export const persistor = persistStore(store);
export const storeValues = store.getState();
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
