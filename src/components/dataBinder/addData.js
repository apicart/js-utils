import {
	DATA_BINDER_LOCAL_STORAGE_KEY, dataBinder,
	dataBinderData
} from './dataBinder';
import {objects} from '../objects/objects';
import {json} from '../json/json';


/**
 * @param {string} keyPath
 * @param {*} value
 * @return {Utils.dataBinder}
 */
export function addData(keyPath, value) {
	objects.assign(dataBinderData, keyPath, value);
	localStorage.setItem(DATA_BINDER_LOCAL_STORAGE_KEY, json.stringify(dataBinderData));

	return dataBinder;
}
