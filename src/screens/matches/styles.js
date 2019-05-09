import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// section styles
	sectionContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	sectionCountryFlag: {
		flex: 1,
		width: 50,
		height: 38
	},
	sectionLeagueLogo: {
		flex: 1,
		width: 50,
		height: 50
	},
	sectionText: {
		flex: 2
	},
	// match styles
	matchContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	matchDateText: {
		textAlign: 'right'
	},
	matchDateContainer: {
		flex: 2
	},
	matchTeamContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	matchTeamsContainer: {
		flex: 1
	},
	matchTeamLogo: {
		width: 50, 
		height: 50
	}
});

export default styles;
