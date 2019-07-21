import React from 'react';
import { View } from 'react-native';

import IconButton from 'library/components/IconButton/IconButton';
import PatternBackground from 'library/components/PatternBackground/PatternBackground';
import SocialFeed from 'library/components/SocialFeed/SocialFeed';
import palette from 'res/palette';
import strings from 'res/strings';

/**
 * Component renders players instagram into social feed
 */
export default class PlayersScreen extends React.Component {

	/**
	 * Navigator options
	 */
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: <IconButton name='bars' onPress={navigation.openDrawer} />,
			headerTitleStyle: palette.headerTitle,
			title: strings.players.title
		};
	};

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<PatternBackground>
				<View>
					<SocialFeed group="players" showAuthor={true} />
				</View>
			</PatternBackground>
		);
	}
}
