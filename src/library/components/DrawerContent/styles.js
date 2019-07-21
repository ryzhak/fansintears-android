import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// scroll view container
	container: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 20
	},
	// top header with logo and nav menu button
	topHeader: {
		alignItems: 'center',
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	// image in header
	logoHeader: {
		height: 24,
		width: 166
	},
	// nav items container
	navigationOptionsContainer: {
		marginTop: 20
	}
});

export default styles;
