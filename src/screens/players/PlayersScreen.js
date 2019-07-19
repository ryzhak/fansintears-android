import React from 'react';
import { View } from 'react-native';

import SocialFeed from 'library/components/SocialFeed/SocialFeed';

/**
 * Component renders players instagram into social feed
 */
export default class PlayersScreen extends React.Component {
	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<View>
				<SocialFeed group="players" showAuthor={true} />
			</View>
		);
	}
}
