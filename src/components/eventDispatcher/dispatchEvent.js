import {eventDispatcher, eventsRegister} from './eventDispatcher';
import {loops} from '../loops/loops';


/**
 * @param {string} event
 * @param {*|null} parameters
 * @return {Utils.eventDispatcher}
 */
export function dispatchEvent(event, parameters) {
	if ( ! Array.isArray(parameters)) {
		parameters = [parameters];
	}

	if (typeof event === 'string') {
		event = event.split(' ');
	}

	loops.forEach(event, function (key, eventName) {
		if ( ! (eventName in eventsRegister)) {
			return;
		}

		loops.forEach(eventsRegister[eventName], function (eventListenerKey, eventListener) {
			if (eventListener.singleAction) {
				eventDispatcher.removeListener(eventListenerKey, eventName);
			}

			eventListener.callback.apply(null, parameters);
		});
	});

	return eventDispatcher;
}
