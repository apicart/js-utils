import {isEmpty} from '../validators/isEmpty';
import {flashMessages} from './flashMessages';


/**
 *
 * @param {string|null} type
 * @return {boolean}
 */
export function hasMessages(type) {
	var messages = flashMessages.getMessages();
	return type ? ! isEmpty(messages[type]) : ! isEmpty(messages);
}
