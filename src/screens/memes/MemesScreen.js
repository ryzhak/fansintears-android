import React from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import IconButton from 'library/components/IconButton/IconButton';
import PatternBackground from 'library/components/PatternBackground/PatternBackground';
import SocialFeed from 'library/components/SocialFeed/SocialFeed';
import palette from 'res/palette';
import strings from 'res/strings';

/**
 * Component renders memes into social feed
 */
export default class MemesScreen extends React.Component {

	/**
	 * Navigator options
	 */
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: <IconButton name='bars' onPress={navigation.openDrawer} />,
			headerTitleStyle: palette.headerTitle,
			title: strings.memes.title
		};
	};

	/**
	 * On component mount
	 */
	async componentDidMount() {
		SplashScreen.hide();
	}

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<PatternBackground>
				<View>
					<SocialFeed group="memes" showAuthor={false} />
				</View>
			</PatternBackground>
		);
	}
}
