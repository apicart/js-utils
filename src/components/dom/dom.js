import {matches} from './matches';
import {on} from './on';
import {findParent} from './findParent';
import {addClass} from './addClass';
import {removeClass} from './removeClass';
import {trigger} from './trigger';

export var dom = {
	addClass: addClass,
	findParent: findParent,
	matches: matches,
	on: on,
	removeClass: removeClass,
	trigger: trigger
};
