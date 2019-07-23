import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, Text, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Video from 'react-native-video';

import FansInTearsApi from 'library/networking/FansInTearsApi';
import palette from 'res/palette';
import strings from 'res/strings';
import styles from './styles';
import colors from '../../../res/colors';

/**
 * Component renders media posts by group
 */
export default class SocialFeed extends React.Component {

	/**
	 * Default component properties
	 */
	static defaultProps = {
		group: 'memes',
		showHeader: true
	};

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
		// disable top border radius for media when header is shown
		let mediaPostStyle = {};
		if(this.props.showHeader) {
			mediaPostStyle = {
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0
			};
		}
		// disable bottom border radius for text container on last card
		let lastTextContainerStyle = {};
		if(isLast && hasMore) {
			lastTextContainerStyle = {
				borderBottomLeftRadius: 0,
				borderBottomRightRadius: 0
			};
		}
		// media post date component (can be used in header or footer)
		const MediaPostDate = () => <Text style={styles.mediaPostDate}>{ moment.unix(mediaPost.createdAt).format('DD MMMM YYYY hh:mm A') }</Text>;
		return (
			<View style={styles.mediaPostContainer}>
				{ this.props.showHeader && 
					<View style={{...styles.authorContainer, ...palette.cardBorderTopRadius}}>
						{ mediaPost.profileAvatar && 
							<Image style={styles.authorAvatar} source={{uri: mediaPost.profileAvatar}} />
						}
						<View style={styles.headerTextContainer}>
							<Text style={styles.authorName}>{ mediaPost.profileFullName }</Text>
							{ this.props.mediaPostDatePosition === 'header' && <MediaPostDate /> }
						</View>
					</View>
				}
				{ mediaPost.type === 'photo' &&
					<AutoHeightImage style={{...palette.cardBorderTopRadius, ...mediaPostStyle}} width={this.state.deviceWidth - styles.mediaPostContainer.padding * 2} source={{uri: mediaPost.url}} />
				}
				{ mediaPost.type === 'video' &&
					<View style={{...styles.mediaPostVideoContainer, ...palette.cardBorderTopRadius, ...mediaPostStyle}}>
						<Video style={styles.mediaPostVideo} source={{uri: mediaPost.url}} resizeMode='stretch' controls={true} paused={true} />
					</View>
				}
				<View style={{...styles.mediaPostTextContentContainer, ...palette.cardBorderBottomRadius, ...lastTextContainerStyle}}>
					<Text style={styles.mediaPostText}>{ mediaPost.text }</Text>
					{ this.props.mediaPostDatePosition === 'footer' && <MediaPostDate /> }
				</View>
				{ isLast && hasMore && !this.state.loading &&
					<Button onPress={this.onLoadMorePress} title={strings.components.socialFeed.loadMore} color={colors.secondary} />
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
				{!this.state.loading && this.state.mediaPosts.length === 0 && <Text style={styles.emptyFeedText}>{strings.components.socialFeed.empty}</Text>}
				{this.state.loading && <ActivityIndicator style={styles.loader} animating={this.state.loading} size="large" color={colors.foreground_light} />}
			</View>
		);
	}
}

/**
 * Component properties
 */
SocialFeed.propTypes = {
	// social media group, available values: 'memes', 'players'
	group: PropTypes.oneOf(['memes', 'players']).isRequired,
	// position of media post creation date
	mediaPostDatePosition: PropTypes.oneOf(['header', 'footer']).isRequired,
	// whether to show header section with avatar(photo), account name and media post date
	showHeader: PropTypes.bool.isRequired
};
