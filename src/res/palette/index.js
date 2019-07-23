import fonts from '../fonts';

const palette = {
	cardBorderTopRadius: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	cardBorderBottomRadius: {
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	},
	commonButton: {
		borderRadius: 20,
		iconSize: 16,
		padding: 10
	},
	drawerIconSize: 18,
	drawerItem: {
		borderRadius: 8
	},
	drawerLabel: {
		fontSize: 14,
      	fontFamily: fonts.regular,
      	fontWeight: 'normal'
	},
	drawerLabelActive: {
		fontSize: 14,
      	fontFamily: fonts.bold,
      	fontWeight: 'normal'
	},
	headerTitle: {
		fontSize: 20,
		fontFamily: fonts.regular,
		fontWeight: 'normal'
	}
};

export default palette;
