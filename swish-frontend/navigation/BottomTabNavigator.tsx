import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import Home from '../screens/Home';
import Contacts from '../screens/Contacts';
import Transactions from '../screens/Transactions';
import Profile from '../screens/Profile';

import TransactionDetails from '../components/TransactionDetails';

import { BottomTabParamList, HomeTabParamList, TransactionsTabParamList, ContactsTabParamList, ProfileTabParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Contacts"
        component={ContactsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeTabStack.Navigator>
  );
}

const ContactsTabStack = createStackNavigator<ContactsTabParamList>();

function ContactsTabNavigator() {
  return (
    <ContactsTabStack.Navigator>
      <ContactsTabStack.Screen
        name="Contact"
        component={Contacts}
        options={{ headerShown: false }}
      />
    </ContactsTabStack.Navigator>
  );
}

const TransactionsTabStack = createStackNavigator<TransactionsTabParamList>();

function TransactionsTabNavigator() {
  return (
    <TransactionsTabStack.Navigator>
      <TransactionsTabStack.Screen
        name="Transactions"
        component={Transactions}
        options={{ headerShown: false }}
      />
      <TransactionsTabStack.Screen
        name="Details"
        component={TransactionDetails}
        options={{ headerShown: false }}
      />
    </TransactionsTabStack.Navigator>
  );
}

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

function ProfileTabNavigator() {
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </ProfileTabStack.Navigator>
  );
}
