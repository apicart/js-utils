import {loops} from '../loops/loops';
import {dom} from './dom';


/**
 * @param {Element|NodeList|[]} element
 * @param {string} event
 * @return {Utils.dom}
 */
export function trigger(element, event) {
	if (element instanceof Element) {
		element = [element];
	}

	loops.forEach(element, function (key, elementItem) {
		var evt = new Event(event, {
			bubbles: true,
			cancelable: true,
			view: window
		});

		elementItem.dispatchEvent(evt);
	});

	return dom;
}
