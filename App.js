/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MatchesScreen from 'screens/matches/MatchesScreen';

const RootStack = createStackNavigator(
  {
    Matches: MatchesScreen
  },
  {
    initialRouteName: 'Matches',
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
