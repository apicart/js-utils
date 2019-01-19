/**
 *
 * @param {string} name
 * @param {string} url
 * @return {string|null}
 */
export function getQueryParameter(name, url) {
	url = url || window.location.href;
	name = name.replace(/[[\]]/g, '\\$&');

	var
		regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);

	if ( ! results) {
		return null;
	}

	if ( ! results[2]) {
		return '';
	}

	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
