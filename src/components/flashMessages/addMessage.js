import {FLASH_MESSAGES_STORAGE_KEY, flashMessages} from './flashMessages';
import {json} from '../json/json';


/**
 * @param {string} content
 * @param {string|null} type
 * @return {Utils.flashMessages}
 */

export function addMessage(content, type) {
	type = type || 'info';

	var flashMessagesItems = flashMessages.getMessages();

	if ( ! (type in flashMessagesItems)) {
		flashMessagesItems[type] = [];
	}

	flashMessagesItems[type].push(content);
	localStorage.setItem(FLASH_MESSAGES_STORAGE_KEY, json.stringify(flashMessagesItems));

	return flashMessages;
}
