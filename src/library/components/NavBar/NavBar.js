import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

/**
 * Component renders navigation bar
 */
class NavBar extends React.Component {

	/**
	 * On menu tap opens navigation drawer
	 */
	onMenuPress = () => {
		this.props.navigation.openDrawer();
	};

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
				<TouchableOpacity style={{backgroundColor: '#FB8B23', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 15}} onPress={this.onMenuPress}>
					<Icon name="bars" size={16} color="#fff" />
				</TouchableOpacity>
				<Text style={{marginLeft: 10, fontSize: 24, fontFamily: 'OpenSans-Regular', color: '#000'}}>Title</Text>
			</View>
		);
	}
}

// apply navigation prop from react-navigation lib to component
export default withNavigation(NavBar);
