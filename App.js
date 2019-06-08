/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import ChatsScreen from 'screens/chats/ChatsScreen';
import MemesScreen from 'screens/memes/MemesScreen';
import PlayersScreen from 'screens/players/PlayersScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Memes: MemesScreen,
    Players: PlayersScreen,
    Chats: ChatsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if(routeName === 'Memes') iconName = 'md-happy';
        if(routeName === 'Players') iconName = 'md-football';
        if(routeName === 'Chats') iconName = 'md-chatbubbles';
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeBackgroundColor: '#fff',
      activeTintColor: '#33475c',
      inactiveBackgroundColor: '#33475c',
      inactiveTintColor: '#fff',
      labelStyle: {
        fontSize: 12
      },
      tabStyle: {
        padding: 4
      }
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
};
