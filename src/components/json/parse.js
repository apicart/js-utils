import {json} from './json';


/**
 * @param {string} content
 * @return {{}}
 */
export function parse(content) {
	return json.isJson(content) ? JSON.parse(content) : {};
}
