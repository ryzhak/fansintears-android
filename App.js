/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import ChatsScreen from 'screens/chats/ChatsScreen';
import MemesScreen from 'screens/memes/MemesScreen';
import PlayersScreen from 'screens/players/PlayersScreen';

const TabNavigator = createBottomTabNavigator({
  Memes: MemesScreen,
  Players: PlayersScreen,
  Chats: ChatsScreen
});

const AppContainer = createAppContainer(TabNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
};
