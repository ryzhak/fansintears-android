import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// media post styles
	mediaPostContainer: {
		backgroundColor: '#33475c',
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
