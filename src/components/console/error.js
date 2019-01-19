import {console as utilsConsole} from './console';


/**
 * @return {utilsConsole}
 */
export function error() {
	if (typeof console.error !== 'undefined') {
		console.error.apply(null, Array.prototype.slice.call(arguments));
	}

	return utilsConsole;
}
