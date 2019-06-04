import config from 'config/config';

/**
 * FansInTears backend API
 */
export default class FansInTearsApi {

	/**
	 * Returns fixtures
	 * @param {number} from Unix timestamp from 
	 * @param {number} to Unix timestamo to
	 * @returns {Array} Array of fixtures 
	 */
	static async getFixtures(from = null, to = null) {
		let url = `${config.API_URL}/fixtures`;
		if(from) url += `?from=${from}`;
		if(to) url += `&fto=${to}`;
		const resp = await fetch(url);
		if(resp.status !== 200) throw new Error();
		const respJson = await resp.json();
		return respJson;
	}

	/**
	 * Returns leagues with chats
	 * @returns {Array} Array of leagues with chats
	 */
	static async getLeagues() {
		const url = `${config.API_URL}/leagues`;
		const resp = await fetch(url);
		if(resp.status !== 200) throw new Error();
		const respJson = await resp.json();
		return respJson;
	}

}
