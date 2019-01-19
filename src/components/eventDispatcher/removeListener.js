import {eventDispatcher, eventsRegister} from './eventDispatcher';
import {loops} from '../loops/loops';


/**
 * @param {string} listenerKey
 * @param {string|array} event
 * @return {Utils.eventDispatcher}
 */
export function removeListener(listenerKey, event) {
	if (typeof event === 'string') {
		event = event.split(' ');
	}

	loops.forEach(event, function (key, eventName) {
		delete eventsRegister[eventName][listenerKey];
	});

	return eventDispatcher;
}
