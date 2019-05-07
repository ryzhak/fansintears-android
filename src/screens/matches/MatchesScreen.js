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
	 * Renders template
	 */
	render() {
		
		const sections = [
			{
				league_id: 94,
				league_country: 'England',
				league_country_code: 'IT',
				league_name: 'Serie A',
				data: [
					{
						homeTeam: 'Napoli',
						awayTeam: 'Cagliari',
						homeTeam_id: 492,
						awayTeam_id: 490,
						event_timestamp: 1557061200
					}
				]
			}
		];

		console.log(sections);

		return (
			<View>
				<Text>MatchesScreen</Text>
				<SectionList
					renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
					renderSectionHeader={({section: {title}}) => (
						<Text style={{fontWeight: 'bold'}}>{title}</Text>
					)}
					sections={[
						{title: 'Title1', data: ['item1', 'item2']},
						{title: 'Title2', data: ['item3', 'item4']},
						{title: 'Title3', data: ['item5', 'item6']},
					]}
				/>
			</View>
		);
	}
}
