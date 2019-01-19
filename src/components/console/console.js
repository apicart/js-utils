import {error} from './error';
import {log} from './log';
import {warn} from './warn';


export var console = {
	error: error,
	log: log,
	warn: warn
};
