import {addListener} from './addListener';
import {dispatchEvent} from './dispatchEvent';
import {removeListener} from './removeListener';


export var eventsRegister = {};
export var eventDispatcher = {
	addListener: addListener,
	dispatchEvent: dispatchEvent,
	removeListener: removeListener
};
