import {addMessage} from './addMessage';
import {getMessages} from './getMessages';
import {hasMessages} from './hasMessages';
import {processMessages} from './processMessages';


export var FLASH_MESSAGES_STORAGE_KEY = 'apicart_flash_messages';
export var flashMessages = {
	addMessage: addMessage,
	getMessages: getMessages,
	hasMessages: hasMessages,
	processMessages: processMessages
};
