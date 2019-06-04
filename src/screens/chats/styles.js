import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// chat styles
	leagueChatContainer: {
		alignItems: 'center',
		borderBottomColor: '#e1e1e1',
		borderBottomWidth: 1,
		flexDirection: 'row',
		padding: 3
	},
	leagueChatLogo: {
		flex: 1,
		height: 40,
		width: 40 
	},
	leagueChatTitle: {
		flex: 3
	},
	// activity indicatior
	loader: {
		marginTop: 10
	},
	// empty leagues styles
	emptyLeaguesText: {
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center'  
	}
});

export default styles;
