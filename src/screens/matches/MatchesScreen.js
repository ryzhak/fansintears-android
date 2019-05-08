import moment from 'moment';
import React from 'react';
import { SectionList, Text, View } from 'react-native';

import config from 'config/config'
import FansInTearsApi from 'library/networking/FansInTearsApi';

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
			const matches = await FansInTearsApi.getFixtures(1557014400);
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
		return (
			<View>
				<View>
					<Text>{league.league_country}</Text>
				</View>
				<View>
					<Text>{league.league_name}</Text>
				</View>
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
		return (
			<View>
				<View>
					<Text>{match.homeTeam}</Text>
					<Text>{match.awayTeam}</Text>
				</View>
				<View>
					<Text>{moment.unix(match.event_timestamp).format('DD.MM HH:mm')}</Text>
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
