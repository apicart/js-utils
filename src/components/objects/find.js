import {loops} from '../loops/loops';


/**
 * @param {{}} object
 * @param {string[]|string} keyPath
 * @return {*|null}
 */
export function find(object, keyPath) {
	if ( ! keyPath || ! object || typeof object !== 'object') {
		return null;
	}

	if (typeof keyPath === 'string') {
		keyPath = keyPath.split('.');
	}

	var wrongKeyPath = false;
	if (keyPath.length > 1) {
		loops.forEach(keyPath, function (key, keyPathPart) {
			if (typeof object !== 'object' || ! (keyPathPart in object)) {
				wrongKeyPath = true;
				return false;
			}

			if (typeof object[keyPathPart] !== 'object') {
				return false;
			}

			object = object[keyPathPart];
		});
	}

	return wrongKeyPath ? null : object[keyPath.pop()];
}
