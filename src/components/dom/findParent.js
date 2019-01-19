/**
 * @param {Element} element
 * @param {string} selector
 * @return {Element|null}
 */
import {dom} from './dom';

export function findParent(element, selector) {
	var parent = null;

	/* eslint-disable-next-line no-cond-assign */
	while (element = element.parentElement) {
		if (dom.matches(element, selector)) {
			parent = element;
			break;
		}
	}

	return parent;
}
