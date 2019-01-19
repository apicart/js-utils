import {loops} from '../loops/loops';


/**
 * @param {string} content
 * @param {{}|[]}parameters
 * @return {string}
 */
export function sprintf(content, parameters) {
	loops.forEach(parameters, function (key, value) {
		if (['number', 'string'].indexOf(typeof value) === -1) {
			return;
		}

		content = content.replace(new RegExp('%' + key + '%', 'g'), value);
	});

	return content;
}
