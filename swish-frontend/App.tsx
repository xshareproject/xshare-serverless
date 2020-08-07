import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {TransactionsContext, Transactions, TransactionSchema} from './data_store/Transactions';

export default function App(){
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } 
  else {
    var transactions = new Transactions();
    return (  
       <TransactionsContext.Provider value={transactions}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
       </TransactionsContext.Provider>
    );
  }
}
