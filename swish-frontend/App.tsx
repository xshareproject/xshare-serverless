import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {TransactionsContext, Transactions} from './data_store/Transactions';
import {ContactsContext, Contacts} from './data_store/Contacts'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {rootReducer} from './redux/root-reducer';

export default function App(){
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = createStore(rootReducer)
  if (!isLoadingComplete) {
    return null;
  } 
  else {
    var transactions = new Transactions();
    var contacts = new Contacts();
    return (  
      <Provider store = {store}>
       <TransactionsContext.Provider value={transactions}>
         <ContactsContext.Provider value={contacts}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar/>
            </SafeAreaProvider>
         </ContactsContext.Provider>
       </TransactionsContext.Provider>
      </Provider>
    );
  }
}
