/**
 * @param {string} content
 * @return {boolean}
 */
export function isJson(content) {
	if (typeof content !== 'string') {
		return false;
	}

	try {
		JSON.parse(content);

	} catch (e) {
		return false;
	}

	return true;
}
