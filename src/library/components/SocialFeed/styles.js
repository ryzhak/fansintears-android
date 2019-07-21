import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// author styles
	authorContainer: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 10
	},
	authorAvatar: {
		borderColor: '#e54f38',
		borderRadius: 20,
		borderWidth: 2,
		height: 40,
		width: 40 
	},
	authorName: {
		fontWeight: 'bold',
		marginLeft: 10
	},
	// media post styles
	mediaPostContainer: {
		padding: 12
	},
	mediaPostTextContentContainer: {
		backgroundColor: '#fff',
		padding: 10
	},
	mediaPostText: {
		fontSize: 20
	},
	mediaPostDate: {
		textAlign: 'right'
	},
	mediaPostVideo: {
		aspectRatio: 1,
		width: '100%'
	},
	// activity indicatior
	loader: {
		marginTop: 10
	},
	// empty feed styles
	emptyFeedText: {
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center'
	}
});

export default styles;
