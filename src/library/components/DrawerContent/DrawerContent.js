import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import IconButton from 'library/components/IconButton/IconButton';
import images from 'res/images';
import styles from './styles';

/**
 * Component renders custom drawer
 */
export default class DrawerContent extends React.Component {

	/**
	 * Renders JSX template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<ScrollView style={styles.container}>
				<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
					{/* logo with close nav button */}
					<View style={styles.topHeader}>
						<Image source={images.misc.logo_drawer} style={styles.logoHeader} />
						<IconButton onPress={this.props.navigation.closeDrawer} />
					</View>
					{/* navigation options */}
					<View style={styles.navigationOptionsContainer}>
						<DrawerItems {...this.props} />
					</View>
				</SafeAreaView>
			</ScrollView>
		);
	};
}
