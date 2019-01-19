import {loops} from '../loops/loops';
import {objects} from './objects';


/**
 * @param {{}} object
 * @return {{}}
 */
export function copy(object) {
	var newObject = {};

	loops.forEach(object, function (key, value) {
		newObject[key] = objects.isObject(value) ? objects.copy(value) : value;
	});

	return newObject;
}
