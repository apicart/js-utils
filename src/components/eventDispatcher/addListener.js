import {eventDispatcher, eventsRegister} from './eventDispatcher';
import {loops} from '../loops/loops';


/**
 * @param {string} listenerKey
 * @param {string} event
 * @param {function} callback
 * @param {boolean} singleAction
 * @return {Utils.eventDispatcher}
 */
export function addListener(listenerKey, event, callback, singleAction) {
	singleAction = singleAction || false;

	if (typeof event === 'string') {
		event = event.split(' ');
	}

	loops.forEach(event, function (key, eventName) {
		if ( ! (eventName in eventsRegister)) {
			eventsRegister[eventName] = {};
		}

		eventsRegister[eventName][listenerKey] = {
			callback: callback,
			singleAction: singleAction
		};
	});

	return eventDispatcher;
}
