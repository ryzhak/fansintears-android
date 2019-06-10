import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Dimensions, FlatList, Text, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

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
		const containerPadding = 12;
		return (
			<View style={{padding: containerPadding, backgroundColor: '#33475c'}}>
				<View style={{flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#fff'}}>
					<Text style={{flex: 3, fontSize: 20}}>{ mediaPost.text }</Text>
					<Text style={{flex: 1, textAlign: 'right'}}>{ moment.unix(mediaPost.createdAt).format('DD.MM HH:mm') }</Text>
				</View>
				{ mediaPost.type === 'photo' &&
					<AutoHeightImage width={this.state.deviceWidth - containerPadding * 2} source={{uri: mediaPost.url}} />
				}
			</View>
		);
	}

	/**
	 * Renders template
	 * @returns {Object} JSX template
	 */
	render() {
		// TODO: no data
		// TODO: loader
		return (
			<View>
				<FlatList 
					data={this.state.mediaPosts}
					keyExtractor={(item) => item._id}
					renderItem={this.renderMediaPost}
				/>
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
