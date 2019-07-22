import React from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Linking, Text, View } from 'react-native';

import CommonButton from 'library/components/CommonButton/CommonButton';
import IconButton from 'library/components/IconButton/IconButton';
import PatternBackground from 'library/components/PatternBackground/PatternBackground';
import FansInTearsApi from 'library/networking/FansInTearsApi';
import colors from 'res/colors';
import images from 'res/images';
import palette from 'res/palette';
import strings from 'res/strings';
import styles from './styles';

/**
 * Component renders a list of league chats
 */
export default class ChatsScreen extends React.Component {

	/**
	 * Navigator options
	 */
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: <IconButton name='bars' onPress={navigation.openDrawer} />,
			headerTitleStyle: palette.headerTitle,
			title: strings.chats.title
		};
	};

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
			<React.Fragment>
				<View style={styles.leagueChatContainer}>
					{league.logo === '' ? (
						<Image style={styles.leagueChatLogo} source={images.misc.ball} resizeMode='contain' />
					) : (
						<Image style={styles.leagueChatLogo} source={{uri: league.logo}} resizeMode='contain' />
					)}
					<View style={styles.containerText}>
						<Text style={styles.leagueCountryText}>{league.country}</Text>
						<Text style={styles.leagueNameText}>{league.name}</Text>
					</View>
					<View style={styles.containerChatButton}>
						<CommonButton iconName="comments" title={strings.chats.buttons.chat} onPress={() => this.onLeagueChatPress(league)} />
					</View>
				</View>
				<View style={styles.separator} />
			</React.Fragment>
		);
	}

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<PatternBackground>
				<View style={styles.container}>
					{this.state.loading && <ActivityIndicator style={styles.loader} animating={this.state.loading} size="large" color={colors.primary} />}
					{!this.state.loading && this.state.leagues.length === 0 && <Text style={styles.emptyLeaguesText}>{strings.chats.empty}</Text>}
					<FlatList  
						data={this.state.leagues}
						keyExtractor={(item) => item._id}
						renderItem={this.renderLeagueChat}
					/>
				</View>
			</PatternBackground>
		);
	}

}
