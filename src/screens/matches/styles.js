import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// section styles
	sectionContainer: {
		alignItems: 'center',
		backgroundColor: '#ffecb3',
		flexDirection: 'row',
		padding: 3
	},
	sectionCountryFlag: {
		flex: 1,
		width: 30,
		height: 23
	},
	sectionCountryText: {
		flex: 2,
		fontWeight: 'bold'
	},
	sectionLeagueLogo: {
		flex: 1,
		marginRight: 5,
		width: 30,
		height: 30
	},
	sectionLeagueText: {
		flex: 2,
		fontWeight: 'bold'
	},
	// match styles
	matchContainer: {
		alignItems: 'center',
		borderBottomColor: '#e1e1e1', 
		borderBottomWidth: 1,
		flexDirection: 'row',
		padding: 3
	},
	matchDateText: {
		textAlign: 'right'
	},
	matchDateContainer: {
		flex: 1,
		marginRight: 10
	},
	matchTeamContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingBottom: 3
	},
	matchTeamText: {
		marginLeft: 10
	},
	matchTeamsContainer: {
		flex: 2
	},
	matchTeamLogo: {
		width: 30, 
		height: 30
	}
});

export default styles;
