import React from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import { NavigationBar } from 'react-native-bars';
import Config from 'react-native-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';
import { Provider } from 'react-redux';

import NiceModal from '@ebay/nice-modal-react';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { PersistGate } from 'redux-persist/integration/react';

import ToastProviderCompo from '@/components/common/ToastProvederCompo';
import { persistor, store } from '@/redux/store';
import { RootNavigator } from '@/routes/RootNavigator';

enableFreeze();

LogBox.ignoreLogs(['new NativeEventEmitter()', 'Flipper', 'RCTBridge', 'Non-serializable values were found']);

if (Config.env === 'dev') {
  //
}
// initializeMMKVFlipper({ default: storage });

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <ToastProviderCompo>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <NiceModal.Provider>
                  <StatusBar barStyle={'dark-content'} translucent backgroundColor={'transparent'} />
                  <RootNavigator />
                </NiceModal.Provider>
              </GestureHandlerRootView>
              {Platform.OS === 'android' && <NavigationBar barStyle="dark-content" />}
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </ToastProviderCompo>
    </GluestackUIProvider>
  );
};

export default App;
