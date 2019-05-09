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
		title: 'Upcoming matches',
	};

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		this.state = { matches: [] };
	}

	/**
	 * On component mount
	 */
	async componentDidMount() {
		try {
			const matches = await FansInTearsApi.getFixtures(1557014400); // TODO: remove timestamp
			this.setState({matches});
		} catch (err) {
			console.error(err);
		}
	}

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
		const sections = [
			{
				league_id: 94,
				league_country: 'Italy',
				league_country_code: 'IT',
				league_name: 'Serie A',
				data: [
					{
						homeTeam: 'Napoli',
						awayTeam: 'Cagliari',
						homeTeam_id: 492,
						awayTeam_id: 490,
						event_timestamp: 1557339677
					},
					{
						homeTeam: 'Napoli',
						awayTeam: 'Cagliari',
						homeTeam_id: 492,
						awayTeam_id: 490,
						event_timestamp: 1557339677
					}
				]
			}
		];

		return (
			<View>
				<SectionList
					renderItem={this.renderMatch}
					renderSectionHeader={this.renderLeague}
					sections={sections}
				/>
			</View>
		);
	}
}
