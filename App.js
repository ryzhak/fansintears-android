/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ChatsScreen from 'screens/chats/ChatsScreen';

const RootStack = createStackNavigator(
  {
    Chats: ChatsScreen
  },
  {
    initialRouteName: 'Chats',
  }
);

const AppContainer = createAppContainer(RootStack);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
};
