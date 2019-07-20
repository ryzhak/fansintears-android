import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * Component renders button with a single icon inside
 */
export default class IconButton extends React.Component {

	/**
	 * Default component properties
	 */
	static defaultProps = {
		componentStyle: {
			alignItems: 'center',
			backgroundColor: '#FB8B23',
			borderRadius: 15,
			height: 30,
			marginLeft: 10,
			justifyContent: 'center',
			width: 30
		},
		iconColor: '#fff',
		iconName: 'bars',
		iconSize: 16,
		onPress: () => {}
	};

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<TouchableOpacity style={{...this.props.componentStyle}} onPress={this.props.onPress}>
				<Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
			</TouchableOpacity>
		);
	}
}

/**
 * Component properties
 */
IconButton.propTypes = {
	// button styles
	componentStyle: PropTypes.object,
	// icon color
	iconColor: PropTypes.string,
	// icon name from FontAwesome5 library
	iconName: PropTypes.string,
	// icon size 
	iconSize: PropTypes.number,
	// on button press handler
	onPress: PropTypes.func
};
