/**
 * @param {number} length
 * @param {string|null} characters
 * @return {string}
 */
export function generateHash(length, characters) {
	var hash = '';

	characters = characters || 'abcdefghijklmnopqrstuvwxyz0123456789';

	while (length--) {
		hash += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return hash;
}
