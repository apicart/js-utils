import {ajax} from './components/ajax';
import {console as utilsConsole} from './components/console/console';
import {dataBinder} from './components/dataBinder/dataBinder';
import {dom} from './components/dom/dom';
import {eventDispatcher} from './components/eventDispatcher/eventDispatcher';
import {flashMessages} from './components/flashMessages/flashMessages';
import {json} from './components/json/json';
import {loops} from './components/loops/loops';
import {objects} from './components/objects/objects';
import {strings} from './components/strings/strings';
import {url} from './components/url/url';
import {validators} from './components/validators/validators';


window[typeof utilsAlias === 'undefined' ? 'Utils' : utilsAlias] = {
	ajax: ajax,
	console: utilsConsole,
	dataBinder: dataBinder,
	dom: dom,
	eventDispatcher: eventDispatcher,
	flashMessages: flashMessages,
	json: json,
	loops: loops,
	objects: objects,
	strings: strings,
	url: url,
	validators: validators
};
