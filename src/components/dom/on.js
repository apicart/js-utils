import {loops} from '../loops/loops';
import {dom} from './dom';


/**
 * @param {string} eventTypes
 * @param {string} selectors
 * @param {function} callback
 * @return {Utils.dom}
 */
export function on(eventTypes, selectors, callback) {
	if (typeof eventTypes === 'string') {
		eventTypes = eventTypes.split(' ');
	}

	if (typeof selectors === 'string') {
		selectors = selectors.split(',');
	}

	loops.forEach(selectors, function (key, selector) {
		loops.forEach(eventTypes, function (key, eventType) {
			(function (selector, eventType) {
				document.addEventListener(eventType, function (event) {
					var target = event.target;

					if (target === document) {
						return;
					}

					while (target && target !== this && ! dom.matches(target, selector)) {
						target = target.parentNode;
					}

					if (target && target !== this) {
						event.preventDefault();
						callback.call(target, event);
					}
				});
			})(selector, eventType);
		});
	});

	return dom;
}
