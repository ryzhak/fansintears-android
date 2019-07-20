import React from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Linking, Text, TouchableNativeFeedback, View } from 'react-native';

import FansInTearsApi from 'library/networking/FansInTearsApi';
import images from 'res/images';
import styles from './styles';

/**
 * Component renders a list of league chats
 */
export default class ChatsScreen extends React.Component {

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		this.state = {
			loading: false, 
			leagues: [] 
		};
	}

	/**
	 * On component mount
	 */
	async componentDidMount() {
		try {
			this.setState({loading: true});
			const leagues = await FansInTearsApi.getLeagues();
			this.setState({leagues});
		} catch (err) {
			console.error(err);
			Alert.alert('Network error', 'Error on getting leagues');
		} finally {
			this.setState({loading: false});
		}
	}

	/**
	 * Handles chat click. Redirects to telegram group
	 * @param {Object} league League object
	 */
	onLeagueChatPress = (league) => {
		// if telegram group does not exist then show error
		if(league.telegram_invite_link === '') {
			Alert.alert('Oops, chat does not exist', 'Chat will be available soon');
		} else {
			// open chat
			Linking.openURL(league.telegram_invite_link);
		}
	};

	/**
	 * Renders a single league chat row
	 * @param {Object} obj League data
	 * @returns {Object} JSX row template
	 */
	renderLeagueChat = (obj) => {
		const league = obj.item;
		return (
			<TouchableNativeFeedback onPress={() => this.onLeagueChatPress(league)}>
				<View style={styles.leagueChatContainer}>
					{league.logo === '' ? (
						<Image style={styles.leagueChatLogo} source={images.misc.ball} resizeMode='contain' />
					) : (
						<Image style={styles.leagueChatLogo} source={{uri: league.logo}} resizeMode='contain' />
					)}
					<Text style={styles.leagueChatTitle}>{league.country}. {league.name}</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<View>
				{this.state.loading && <ActivityIndicator style={styles.loader} animating={this.state.loading} size="large" color="#e54f38" />}
				{!this.state.loading && this.state.leagues.length === 0 && <Text style={styles.emptyLeaguesText}>No chats available :(</Text>}
				<FlatList  
					data={this.state.leagues}
					keyExtractor={(item) => item._id}
					renderItem={this.renderLeagueChat}
				/>
			</View>
		);
	}

}
