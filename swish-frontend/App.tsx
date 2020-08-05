import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {TransactionsContext, transactions, updateTransactions} from './data_store/Context';

export default function App(){
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } 
  else {
    const transactionContext = {
      transactions,
      updateTransactions
    };
    return (
       <TransactionsContext.Provider value={transactionContext}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
       </TransactionsContext.Provider>
    );
  }
}
