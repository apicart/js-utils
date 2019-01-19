import {objects} from './objects';
import {loops} from '../loops/loops';


/**
 * @param {{}} object
 * @param {string|array} keyPath
 * @return {Utils.objects}
 */
export function deleteObject(object, keyPath) {
	if (typeof keyPath === 'string') {
		keyPath = keyPath.split('.');
	}

	if (keyPath.length > 1) {
		loops.forEach(keyPath, function (index, key) {
			if (typeof object[key] !== 'object') {
				return false;
			}

			object = object[key];
		});
	}

	delete object[keyPath.pop()];

	return objects;
}
