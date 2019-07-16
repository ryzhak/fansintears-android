/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import ChatsScreen from 'screens/chats/ChatsScreen';
import MemesScreen from 'screens/memes/MemesScreen';
import PlayersScreen from 'screens/players/PlayersScreen';

const DrawerNavigator = createDrawerNavigator({
  Memes: {
    screen: MemesScreen
  },
  Players: {
    screen: PlayersScreen
  },
  Chats: {
    screen: ChatsScreen
  }
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
