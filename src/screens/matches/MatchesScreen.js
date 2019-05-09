import moment from 'moment';
import React from 'react';
import { Image, SectionList, Text, View } from 'react-native';

import config from 'config/config'
import FansInTearsApi from 'library/networking/FansInTearsApi';
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
		this.state = { sections: [] };
	}

	/**
	 * On component mount
	 */
	async componentDidMount() {
		try {
			const matches = await FansInTearsApi.getFixtures();
			const sections = this.convertMatchesForSectionsList(matches);
			this.setState({sections});
		} catch (err) {
			console.error(err);
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
		const imgCountryFlagSrc = require('../../res/images/country_flags/it.png');
		const imgLeagueLogoSrc = require('../../res/images/league_logos/94.png');
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
		const imgHomeTeamSrc = require('../../res/images/club_logos/492.png');
		const imgAwayTeamSrc = require('../../res/images/club_logos/490.png');
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
