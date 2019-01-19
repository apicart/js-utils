/**
 * @param {*} data
 * @return {boolean}
 */
export function isEmpty(data) {
	var dataType = typeof data;

	if (dataType === 'undefined' || data === null) {
		return true;
	}

	if (dataType === 'number') {
		return false;

	} else if (dataType === 'string') {
		return !! data.length;

	} else if (dataType === 'object' || Array.isArray(data)) {
		return Object.keys(data).length < 1;
	}
}
