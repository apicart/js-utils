import {FLASH_MESSAGES_STORAGE_KEY} from './flashMessages';
import {json} from '../json/json';


/**
 * @return {{}}
 */
export function getMessages() {
	var flashMessages = localStorage.getItem(FLASH_MESSAGES_STORAGE_KEY);
	flashMessages = flashMessages ? json.parse(flashMessages) : {};

	return flashMessages;
}
