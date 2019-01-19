import {console as utilsConsole} from './console';


/**
 * @return {Utils.console}
 */
export function log() {
	if (typeof console.log !== 'undefined') {
		console.log.apply(null, Array.prototype.slice.call(arguments));
	}

	return utilsConsole;
}
