import React from 'react';
import { ImageBackground } from 'react-native';

import images from 'res/images';
import styles from './styles';

/**
 * Component renders pattern background image (used in screens)
 */
export default class PatternBackground extends React.Component {
	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<ImageBackground source={images.misc.background_pattern} style={styles.imageBackground}>
				{this.props.children}
			</ImageBackground>
		);
	}
}
