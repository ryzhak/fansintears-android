import React from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import SocialFeed from 'library/components/SocialFeed';

/**
 * Component renders memes into social feed
 */
export default class MemesScreen extends React.Component {

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
			<View>
				<SocialFeed group="memes" showAuthor={false} />
			</View>
		);
	}
}
