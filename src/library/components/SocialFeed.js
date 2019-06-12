import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, Text, View } from 'react-native';
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
			currentPage: 0,
			deviceWidth: Dimensions.get('window').width,
			lastPage: 0,
			loading: false, 
			mediaPosts: [] 
		};
	}

	/**
	 * On component mount
	 */
	componentDidMount() {
		this.loadMediaPosts(this.state.currentPage);
	}

	/**
	 * Loads media posts
	 * @param {number} page Pagination number
	 */
	loadMediaPosts = async (page) => {
		try {
			this.setState({loading: true});
			const resp = await FansInTearsApi.getMediaPosts(this.props.group, page);
			this.setState({
				lastPage: +resp.headers['x-page-last'],
				mediaPosts: [...this.state.mediaPosts, ...resp.data]
			});
		} catch (err) {
			console.error(err);
			Alert.alert('Network error', 'Error on getting media posts');
		} finally {
			this.setState({loading: false});
		}
	};

	/**
	 * Loads the next content page
	 */
	onLoadMorePress = () => {
		// increase current page by 1 and load next page
		this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }), () => {
			this.loadMediaPosts(this.state.currentPage);
		});
	};

	/**
	 * Renders media post in a list
	 * @param {Object} obj Media post data
	 * @returns {Object} JSX with media post single row template
	 */
	renderMediaPost = (obj) => {
		const mediaPost = obj.item;
		const isLast = obj.index === this.state.mediaPosts.length - 1;
		const hasMore = this.state.currentPage < this.state.lastPage;
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
				{ isLast && hasMore && !this.state.loading &&
					<Button onPress={this.onLoadMorePress} title="Load More" color="#e54f38" />
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
