import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import fonts from 'res/fonts';
import colors from 'res/colors';
import palette from 'res/palette';
import strings from 'res/strings';

/**
 * Component renders a regular button (with optional icon)
 */
export default class CommonButton extends React.Component {

	/**
	 * Default component properties
	 */
	static defaultProps = {
		containerStyle: {
			flexDirection: 'row',
			backgroundColor: colors.background_light
		},
		iconColor: colors.foreground_light,
		iconContainerStyle: {
			backgroundColor: colors.background_dark, 
			borderBottomLeftRadius: palette.commonButton.borderRadius,
			borderTopLeftRadius: palette.commonButton.borderRadius,
			marginRight: 1,
			padding: palette.commonButton.padding
		},
		iconName: null,
		iconSize: palette.commonButton.iconSize,
		title: strings.components.commonButton.defaultTitle,
		textStyle: {
			color: colors.foreground_light,
			fontFamily: fonts.regular
		},
		onPress: () => {}
	};

	/**
	 * Returns dynamic styles for chat container
	 * @return {Object} container style
	 */
	getChatContainerStyle = () => {
		let basicStyle = {
			backgroundColor: colors.background_dark,
			borderBottomRightRadius: palette.commonButton.borderRadius,
			borderTopRightRadius: palette.commonButton.borderRadius,
			padding: palette.commonButton.padding
		};
		// if there is no icon then set border radius for all borders
		if(!this.props.iconName) {
			basicStyle = Object.assign(basicStyle, {
				borderBottomLeftRadius: palette.commonButton.borderRadius,
				borderTopLeftRadius: palette.commonButton.borderRadius
			});
		}
		return basicStyle;
	};

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<TouchableOpacity style={{...this.props.containerStyle}} onPress={this.props.onPress}>
				{this.props.iconName && 
					<View style={{...this.props.iconContainerStyle}}>
						<Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
					</View>
				}
				<View style={this.getChatContainerStyle()}>
					<Text style={{...this.props.textStyle}}>{this.props.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

/**
 * Component properties
 */
CommonButton.propTypes = {
	// button container style
	containerStyle: PropTypes.object,
	// icon color
	iconColor: PropTypes.string,
	// icon container style
	iconContainerStyle: PropTypes.object,
	// icon name from FontAwesome5 lib
	iconName: PropTypes.string,
	// icon size 
	iconSize: PropTypes.number,
	// button text
	title: PropTypes.string,
	// button text style
	textStyle: PropTypes.object,
	// on button press handler
	onPress: PropTypes.func
};
