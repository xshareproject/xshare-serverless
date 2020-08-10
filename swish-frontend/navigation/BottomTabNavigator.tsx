import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import Home from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import TransactionsOverviewScreen from '../screens/TransactionsOverviewScreen';
import ProfileScreen from '../screens/ProfileScreen';

import TransactionDetailsScreen from '../screens/TransactionDetailsScreen';

const BottomTab = createBottomTabNavigator();
// const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigation}
        options={{
          tabBarIcon: ({ color }) => 
          <Icon 
          name='home' 
          type='ant-design'
          size= {20}
          color={color}/>
        }}
      />
      <BottomTab.Screen
        name="Contacts"
        component={ContactTabNavigation}
        options={{
          tabBarIcon: ({ color }) => 
          <Icon 
          name='contacts' 
          type='ant-design'
          size= {20}
          color={color}/>
        }}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionTabNavigation}
        options = { 
          ({route}) => ({
          tabBarIcon: ({ color }) => 
          <Icon 
          name='paper-plane' 
          type='fontisto'
          size= {20}
          color={color}/>,
          tabBarVisible: getTabBarVisibility(route)
          })
        }
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabNavigation}
        options = {{
          tabBarIcon: ({ color }) => 
          <Icon 
          name='profile' 
          type='ant-design'
          size= {20}
          color={color}/>
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
const HomeStackNavigator = createStackNavigator();

function HomeTabNavigation() {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStackNavigator.Navigator>
  );
}

const ContactsStackNavigator = createStackNavigator();

function ContactTabNavigation() {
  return (
    <ContactsStackNavigator.Navigator>
      <ContactsStackNavigator.Screen
        name="Contact"
        component={ContactScreen}
        options={{ headerShown: false }}
      />
    </ContactsStackNavigator.Navigator>
  );
}

const TransactionsStackNavigator = createStackNavigator();

function TransactionTabNavigation() {
  return (
    <TransactionsStackNavigator.Navigator>
      <TransactionsStackNavigator.Screen
        name="Overview"
        component={TransactionsOverviewScreen}
        options={{ headerShown: false }}
      />
      <TransactionsStackNavigator.Screen 
        name="Details"
        component={TransactionDetailsScreen}
      />
    </TransactionsStackNavigator.Navigator>
  );
}

const ProfileStackNavigator = createStackNavigator();

function ProfileTabNavigation() {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStackNavigator.Navigator>
  );
}

const getTabBarVisibility = (route : any) => {
  if(route.state){
    const routeName = route.state.routes[route.state.index].name;
    if (routeName === "Details")
      return false;
  }
  return true;
}
