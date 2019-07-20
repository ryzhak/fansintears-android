/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import ChatsScreen from 'screens/chats/ChatsScreen';
import MemesScreen from 'screens/memes/MemesScreen';
import PlayersScreen from 'screens/players/PlayersScreen';

const DrawerNavigator = createDrawerNavigator({
  Memes: createStackNavigator({
    Memes: {
      screen: MemesScreen
    }
  }),
  Players: createStackNavigator({
    Players: {
      screen: PlayersScreen
    }
  }),
  Chats: createStackNavigator({
    Chats: {
      screen: ChatsScreen
    }
  })
});

const AppContainer = createAppContainer(DrawerNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
};
