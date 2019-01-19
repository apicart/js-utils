import {loops} from '../loops/loops';
import {objects} from './objects';


/**
 * @param objects
 * @return {{}}
 */
export function merge() {
	var
		newObject = {},
		iterable = Array.prototype.slice.call(arguments);

	loops.forEach(iterable, function (objectKey, object) {
		loops.forEach(object, function (key, value) {
			newObject[key] = ! (key in newObject) || ! objects.isObject(value)
				? value
				: objects.merge(newObject[key], value);
		});
	});

	return newObject;
}
