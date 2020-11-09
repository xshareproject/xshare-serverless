import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './redux/root-reducer';

export default function App(){
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = createStore(rootReducer)
  if (!isLoadingComplete) {
    return null;
  } 
  else {
    return (  
      <Provider store = {store}>
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar/>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
