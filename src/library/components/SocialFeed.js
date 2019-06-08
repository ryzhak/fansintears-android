import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Text, View } from 'react-native';

import FansInTearsApi from 'library/networking/FansInTearsApi';

/**
 * Component renders media posts by group
 */
export default class SocialFeed extends React.Component {

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		this.state = {
			loading: false, 
			mediaPosts: [] 
		};
	}

	/**
	 * On component mount
	 */
	componentDidMount() {
		this.loadMediaPosts(0);
	}

	/**
	 * Loads media posts
	 * @param {number} page Pagination number
	 */
	loadMediaPosts = async (page) => {
		try {
			this.setState({loading: true});
			const mediaPosts = await FansInTearsApi.getMediaPosts(this.props.group, page);
			this.setState({mediaPosts: [...this.state.mediaPosts, ...mediaPosts]});
			console.log(this.state.mediaPosts);
		} catch (err) {
			console.error(err);
			Alert.alert('Network error', 'Error on getting media posts');
		} finally {
			this.setState({loading: false});
		}
	};

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<View>
				<Text>Social feed</Text>
			</View>
		);
	}
}

/**
 * Component properties
 */
SocialFeed.propTypes = {
	// social media group, available values: 'memes', 'players'
	group: PropTypes.oneOf(['memes', 'players']).isRequired
};
