import { StyleSheet } from 'react-native';

import colors from 'res/colors';
import fonts from 'res/fonts';

const styles = StyleSheet.create({
	// author styles
	authorContainer: {
		alignItems: 'center',
		backgroundColor: colors.background_light,
		flexDirection: 'row',
		padding: 10
	},
	authorAvatar: {
		borderRadius: 20,
		height: 40,
		width: 40 
	},
	headerTextContainer: {
		marginLeft: 10
	},
	authorName: {
		color: colors.foreground_dark,
		fontFamily: fonts.semibold,
		fontSize: 16
	},
	// media post styles
	mediaPostContainer: {
		padding: 12
	},
	mediaPostTextContentContainer: {
		backgroundColor: colors.background_light,
		padding: 15
	},
	mediaPostText: {
		color: colors.foreground_dark,
		fontFamily: fonts.semibold,
		fontSize: 16
	},
	mediaPostDate: {
		color: colors.helper,
		fontFamily: fonts.regular,
		fontSize: 12
	},
	mediaPostVideoContainer: {
		overflow: 'hidden'
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
		color: colors.foreground_light,
		fontFamily: fonts.semibold,
		fontSize: 18,
		marginTop: 10,
		textAlign: 'center'
	}
});

export default styles;
