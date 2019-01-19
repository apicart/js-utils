import {loops} from '../loops/loops';


/**
 * @param {{}} object
 * @return {Array}
 */
export function values(object) {
	var values = [];

	loops.forEach(object, function (key, value) {
		values.push(value);
	});

	return values;
}
