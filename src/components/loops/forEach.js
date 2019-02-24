import {loops} from './loops';


/**
 * @param {{}|[]} iterable
 * @param {function} callback
 * @return {loops}
 */
export function forEach(iterable, callback) {
	var
		iterator,
		iteratorObject = {
			iterableLength: 0,
			counter: 0,
			isEven: function () {
				return this.counter % 2 === 0;
			},
			isOdd: function () {
				return Math.abs(this.counter % 2) === 1;
			},
			isFirst: function () {
				return this.counter === 1;
			},
			isLast: function () {
				return this.counter === this.iterableLength;
			}
		},
		iterableLength,
		statement,
		keys,
		keysLength,
		key;

	if (['undefined', 'number'].indexOf(typeof iterable) > -1 || iterable === null) {
		return;
	}

	if (Array.isArray(iterable)) {
		iterableLength = Object.keys(iterable).length;

		if ( ! iterableLength) {
			return;
		}

		iteratorObject.iterableLength = iterableLength;
		for (iterator = 0; iterator < iterableLength; iterator ++) {
			iteratorObject.counter ++;
			statement = callback.apply(iteratorObject, [iterator, iterable[iterator]]);

			if (statement === false) {
				break;
			}
		}

	} else {
		keys = Object.keys(iterable);
		keysLength = keys.length;

		if ( ! keys.length) {
			return;
		}

		iteratorObject.iterableLength = keysLength;
		for (iterator = 0; iterator < keysLength; iterator ++) {
			iteratorObject.counter ++;
			key = keys[iterator];
			statement = callback.apply(iteratorObject, [key, iterable[key]]);

			if (statement === false) {
				break;
			}
		}
	}

	return loops;
}
