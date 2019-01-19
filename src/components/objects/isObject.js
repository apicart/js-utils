/**
 * @param {*} data
 * @return {boolean}
 */
export function isObject(data) {
	if (typeof data === 'undefined' || data === null || Array.isArray(data)) {
		return false;
	}

	return typeof data === 'object';
}
