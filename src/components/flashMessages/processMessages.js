import {FLASH_MESSAGES_STORAGE_KEY, flashMessages} from './flashMessages';
import {loops} from '../loops/loops';
import {json} from '../json/json';
import {validators} from '../validators/validators';


/**
 * @param {function} callback
 * @param {string|null} type
 * @return {Utils.flashMessages}
 */
export function processMessages(callback, type) {
	var messages;

	if (typeof type === 'string' && flashMessages.hasMessages(type)) {
		messages = flashMessages.getMessages();
		loops.forEach(messages[type], function (key, message) {
			callback(message, type);
		});

	} else if (flashMessages.hasMessages()) {
		messages = flashMessages.getMessages();
		loops.forEach(messages, function (messagesType, messagesQueue) {
			if (validators.isEmpty(messagesQueue)) {
				return;
			}

			loops.forEach(messagesQueue, function (key, message) {
				callback(message, messagesType);
			});
		});
	}

	localStorage.setItem(FLASH_MESSAGES_STORAGE_KEY, json.stringify({}));
	return flashMessages;
}
