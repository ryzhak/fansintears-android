import React from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import IconButton from 'library/components/IconButton/IconButton';
import SocialFeed from 'library/components/SocialFeed/SocialFeed';

/**
 * Component renders memes into social feed
 */
export default class MemesScreen extends React.Component {

	/**
	 * Navigator options
	 */
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Memes',
			headerTitleStyle: {
				fontSize: 20,
				fontFamily: 'OpenSans-Regular',
				fontWeight: 'normal'
			},
			headerLeft: <IconButton name='bars' onPress={navigation.openDrawer} />
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
			<View>
				<SocialFeed group="memes" showAuthor={false} />
			</View>
		);
	}
}
