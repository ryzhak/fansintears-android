import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
			headerLeft: <TouchableOpacity style={{backgroundColor: '#FB8B23', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginLeft: 10}} onPress={navigation.openDrawer}>
							<Icon name="bars" size={16} color="#fff" />
						</TouchableOpacity>
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
