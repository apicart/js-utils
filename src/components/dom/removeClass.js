import {dom} from './dom';


/**
 * @param {Element} element
 * @param {string} classes
 * @return {Utils.dom}
 */
export function removeClass(element, classes) {
	classes = classes.replace(' ', '|');
	element.className = element.className.replace(new RegExp(classes, 'g'), '').trim();
	element.className = element.className.replace(/\s+/, ' ');

	return dom;
}
