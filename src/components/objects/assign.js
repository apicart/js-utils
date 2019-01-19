import {objects} from './objects';


/**
 * @param {{}} object
 * @param {string|array} keyPath
 * @param {*} value
 * @return {Utils.objects}
 */
export function assign(object, keyPath, value) {
	if (typeof keyPath === 'string') {
		keyPath = keyPath.split('.');
	}

	var
		key,
		lastKeyIndex = keyPath.length - 1;

	for (var i = 0; i < lastKeyIndex; ++ i) {
		key = keyPath[i];

		if ( ! (key in object)) {
			object[key] = {};
		}

		object = object[key];
	}

	object[keyPath[lastKeyIndex]] = value;

	return objects;
}
