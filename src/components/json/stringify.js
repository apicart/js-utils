/**
 * @param {{}} object
 * @return {string}
 */
export function stringify(object) {
	return typeof object === 'object' ? JSON.stringify(object) : '';
}
