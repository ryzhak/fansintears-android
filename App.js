/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import DrawerContent from 'library/components/DrawerContent/DrawerContent';
import colors from 'res/colors';
import palette from 'res/palette';
import strings from 'res/strings';
import ChatsScreen from 'screens/chats/ChatsScreen';
import MemesScreen from 'screens/memes/MemesScreen';
import PlayersScreen from 'screens/players/PlayersScreen';

const DrawerNavigator = createDrawerNavigator({
  Memes: {
    screen: createStackNavigator({
      Memes: {
        screen: MemesScreen
      }
    }),
    navigationOptions: {
      drawerIcon: (options) => <Icon name="laugh-squint" size={palette.drawerIconSize} color={options.tintColor} />,
      drawerLabel: strings.memes.title
    }
  },
  Players: {
    screen: createStackNavigator({
      Players: {
        screen: PlayersScreen
      }
    }),
    navigationOptions: {
      drawerIcon: (options) => <Icon name="trophy" size={palette.drawerIconSize} color={options.tintColor} />,
      drawerLabel: strings.players.title
    }
  },
  Chats: {
    screen: createStackNavigator({
      Chats: {
        screen: ChatsScreen
      }
    }),
    navigationOptions: {
      drawerIcon: (options) => <Icon name="comments"size={palette.drawerIconSize} color={options.tintColor} />,
      drawerLabel: strings.chats.title
    }
  }
}, {
  contentComponent: DrawerContent,
  contentOptions: {
    activeBackgroundColor: colors.primary,
    activeLabelStyle: palette.drawerLabelActive,
    activeTintColor: colors.foreground_light,
    inactiveBackgroundColor: colors.background_light,
    itemStyle: palette.drawerItem,
    labelStyle: palette.drawerLabel
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
