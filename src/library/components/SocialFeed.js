import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Text, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Video from 'react-native-video';

import FansInTearsApi from 'library/networking/FansInTearsApi';
import styles from './styles';

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
			deviceWidth: Dimensions.get('window').width,
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
		} catch (err) {
			console.error(err);
			Alert.alert('Network error', 'Error on getting media posts');
		} finally {
			this.setState({loading: false});
		}
	};

	/**
	 * Renders media post in a list
	 * @param {Object} obj Media post data
	 * @returns {Object} JSX with media post single row template
	 */
	renderMediaPost = (obj) => {
		const mediaPost = obj.item;
		return (
			<View style={styles.mediaPostContainer}>
				<View style={styles.mediaPostTextContentContainer}>
					<Text style={styles.mediaPostText}>{ mediaPost.text }</Text>
					<Text style={styles.mediaPostDate}>{ moment.unix(mediaPost.createdAt).format('DD.MM HH:mm') }</Text>
				</View>
				{ mediaPost.type === 'photo' &&
					<AutoHeightImage width={this.state.deviceWidth - styles.mediaPostContainer.padding * 2} source={{uri: mediaPost.url}} />
				}
				{ mediaPost.type === 'video' &&
					<Video style={styles.mediaPostVideo} source={{uri: mediaPost.url}} resizeMode='stretch' controls={true} paused={true} />
				}
			</View>
		);
	}

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<View>
				<FlatList 
					data={this.state.mediaPosts}
					keyExtractor={(item) => item._id}
					renderItem={this.renderMediaPost}
				/>
				{!this.state.loading && this.state.mediaPosts.length === 0 && <Text style={styles.emptyFeedText}>No feed available :(</Text>}
				{this.state.loading && <ActivityIndicator style={styles.loader} animating={this.state.loading} size="large" color="#e54f38" />}
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
