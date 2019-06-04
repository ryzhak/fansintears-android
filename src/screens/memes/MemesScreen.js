import React from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

// TODO: desc
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
				<Text>Memes</Text>
			</View>
		);
	}
}
