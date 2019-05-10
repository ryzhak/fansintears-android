import moment from 'moment';
import React from 'react';
import { ActivityIndicator, Image, SectionList, Text, View } from 'react-native';

import config from 'config/config'
import FansInTearsApi from 'library/networking/FansInTearsApi';
import images from 'res/images';
import styles from './styles';

/**
 * Component renders a list of nearest matches and makes redirect to telegram chats
 */
export default class MatchesScreen extends React.Component {

	/**
	 * Navigator options
	 */
	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#33475c',
		},
		headerTintColor: '#fff',
		title: 'Upcoming matches',
	};

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		this.state = {
			loading: false, 
			sections: [] 
		};
	}

	/**
	 * On component mount
	 */
	async componentDidMount() {
		try {
			this.setState({loading: true});
			const matches = await FansInTearsApi.getFixtures();
			const sections = this.convertMatchesForSectionsList(matches);
			this.setState({sections});
		} catch (err) {
			console.error(err);
		} finally {
			this.setState({loading: false});
		}
	}

	/**
	 * Returns converted matches ready to be used by section list
	 * @param {Array<Object>} matches Array of matches from server
	 * @returns {Array<Object>} Array leagues with matches
	 */
	convertMatchesForSectionsList = (matches) => {
		let sections = [];
		for(let i = 0; i < matches.length; i++) {
			const leagueData = {
				league_id: matches[i].league.id,
				league_country: matches[i].league.country,
				league_country_code: matches[i].league.country_code,
				league_name: matches[i].league.name,
				data: []
			};
			const matchData = {
				id: matches[i].id,
				homeTeam: matches[i].homeTeam,
				awayTeam: matches[i].awayTeam,
				homeTeam_id: matches[i].homeTeam_id,
				awayTeam_id: matches[i].awayTeam_id,
				event_timestamp: matches[i].event_timestamp
			};
			// if league does not exist in sections then add match there and add league to sections
			if(sections.filter((section) => section.league_id === leagueData.league_id).length === 0) {
				leagueData.data.push(matchData);
				sections.push(leagueData);
			} else {
				// league already exists, find it and add match there
				for(let j = 0; j < sections.length; j++) {
					if(sections[j].league_id === leagueData.league_id) {
						sections[j].data.push(matchData);
						break;
					}
				}
			}
		}
		return sections;
	};

	/**
	 * Renders a league section
	 * @param {Object} obj Render item
	 * @returns {Object} Section template
	 */
	renderLeague = (obj) => {
		const league = obj.section;
		const imgCountryFlagSrc = images.country_flags[league.league_country_code.toLowerCase()];
		const imgLeagueLogoSrc = images.league_logos[league.league_id];
		return (
			<View style={styles.sectionContainer}>
				<Image style={styles.sectionCountryFlag} source={imgCountryFlagSrc} resizeMode='contain'/>
				<Text style={styles.sectionCountryText}>{league.league_country}</Text>
				<Image style={styles.sectionLeagueLogo} source={imgLeagueLogoSrc} resizeMode='contain'/>
				<Text style={styles.sectionLeagueText}>{league.league_name}</Text>
			</View>
		);
	};

	/**
	 * Renders a single match item
	 * @param {Object} obj Render item 
	 * @returns {Object} Item template
	 */
	renderMatch = (obj) => {
		const match = obj.item;
		const imgHomeTeamSrc = images.club_logos[match.homeTeam_id];
		const imgAwayTeamSrc = images.club_logos[match.awayTeam_id];
		return (
			<View style={styles.matchContainer}>
				<View style={styles.matchTeamsContainer}>
					<View style={styles.matchTeamContainer}>
						<Image style={styles.matchTeamLogo} source={imgHomeTeamSrc} resizeMode='contain'/>
						<Text style={styles.matchTeamText}>{match.homeTeam}</Text>
					</View>
					<View style={styles.matchTeamContainer}>
						<Image style={styles.matchTeamLogo} source={imgAwayTeamSrc} resizeMode='contain'/>
						<Text style={styles.matchTeamText}>{match.awayTeam}</Text>
					</View>
				</View>
				<View style={styles.matchDateContainer}>
					<Text style={styles.matchDateText}>{moment.unix(match.event_timestamp).format('DD.MM HH:mm')}</Text>
				</View>
			</View>
		);
	};

	/**
	 * Renders template
	 * @returns {Object} Template
	 */
	render() {
		return (
			<View>
				{this.state.loading && <ActivityIndicator style={styles.loader} animating={this.state.loading} size="large" color="#33475c" />}
				<SectionList
					keyExtractor={(item) => item.id}
					renderItem={this.renderMatch}
					renderSectionHeader={this.renderLeague}
					sections={this.state.sections}
				/>
			</View>
		);
	}
}
