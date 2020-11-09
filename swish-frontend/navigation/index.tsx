import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {LOAD_TRANSACTIONS, LOAD_CONTACTS, LOAD_CONTACT_TRANSACTION_PAIRS} from '../redux/types/types.actions';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
function Navigation({ colorScheme, loadTransactions, loadContacts, loadContactTransactionPairs} : 
        { colorScheme: ColorSchemeName, loadTransactions: Function, loadContacts: Function, loadContactTransactionPairs: Function }) {
  //Load Redux store data at top level component
  loadTransactions();
  loadContacts();
  loadContactTransactionPairs();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

interface DispatchProps {
  loadTransactions: Function,
  loadContacts: Function,
  loadContactTransactionPairs: Function
}

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => {
  return {
    loadTransactions: () => dispatch({type: LOAD_TRANSACTIONS}),
    loadContacts: () => dispatch({type: LOAD_CONTACTS}),
    loadContactTransactionPairs: () => dispatch({type: LOAD_CONTACT_TRANSACTION_PAIRS})
  }
};

export default connect(null, mapDispatchToProps)(Navigation);

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
