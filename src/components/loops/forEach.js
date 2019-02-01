import {loops} from './loops';


/**
 * @param {{}|[]} iterable
 * @param {function} callback
 * @return {loops}
 */
export function forEach(iterable, callback) {
	var
		iterator,
		iterableLength,
		statement,
		keys,
		keysLength,
		key;

	if (['undefined', 'number'].indexOf(typeof iterable) > -1 || iterable === null) {
		return;
	}

	if (Array.isArray(iterable)) {
		iterableLength = iterable.length;

		if ( ! iterableLength) {
			return;
		}

		for (iterator = 0; iterator < iterableLength; iterator ++) {
			statement = callback(iterator, iterable[iterator]);

			if (statement === false) {
				break;
			}
		}

	} else {
		keys = Object.keys(iterable);
		keysLength = keys.length;

		if ( ! keysLength) {
			return;
		}

		for (iterator = 0; iterator < keysLength; iterator ++) {
			key = keys[iterator];
			statement = callback(key, iterable[key]);

			if (statement === false) {
				break;
			}
		}
	}

	return loops;
}
