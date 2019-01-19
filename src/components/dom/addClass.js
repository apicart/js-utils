import {loops} from '../loops/loops';
import {dom} from './dom';


/**
 * @param {Element} element
 * @param {string|array} classes
 * @return {Utils.dom}
 */
export function addClass(element, classes) {
	if (typeof classes === 'string') {
		classes = classes.split(' ');
	}

	loops.forEach(classes, function (key, newClass) {
		if ( ! element.classList.contains(newClass)) {
			element.className += ' ' + newClass;
		}
	});

	element.className = element.className.trim();

	return dom;
}
