import { StyleSheet } from 'react-native';

import colors from 'res/colors';
import fonts from 'res/fonts';

const styles = StyleSheet.create({
	// container
	container: {
		backgroundColor: colors.background_light, 
		borderRadius: 10,
		margin: 15
	},
	// chat styles
	leagueChatContainer: {
		flexDirection: 'row', 
		margin: 10
	},
	leagueChatLogo: {
		height: 40,
		width: 40 
	},
	// container for test
	containerText: {
		marginLeft: 10
	},
	// league country text
	leagueCountryText: {
		color: colors.foreground_dark,
		fontFamily: fonts.semibold, 
		fontSize: 14
	},
	// league name text
	leagueNameText: {
		color: colors.helper,
		fontFamily: fonts.regular, 
		fontSize: 12
	},
	// container for chat button
	containerChatButton: {
		flex: 1,
		flexDirection: 'row',  
		justifyContent: 'flex-end'
	},
	// separator between leagues
	separator: {
		borderBottomColor: colors.helper_light, 
		borderBottomWidth: 1,
		marginLeft: 60, 
		marginRight: 10
	},
	// activity indicatior
	loader: {
		marginBottom: 10,
		marginTop: 10
	},
	// empty leagues styles
	emptyLeaguesText: {
		color: colors.foreground_dark,
		fontFamily: fonts.regular,
		fontSize: 16,
		marginBottom: 10,
		marginTop: 10,
		textAlign: 'center'  
	}
});

export default styles;
