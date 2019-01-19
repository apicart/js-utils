import {console as utilsConsole} from './console';


/**
 * @return {Utils.console}
 */
export function warn() {
	if (typeof console.warn !== 'undefined') {
		console.warn.apply(null, Array.prototype.slice.call(arguments));
	}

	return utilsConsole;
}
