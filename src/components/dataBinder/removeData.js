import {DATA_BINDER_LOCAL_STORAGE_KEY, dataBinder, dataBinderData} from './dataBinder';
import {deleteObject} from '../objects/delete';
import {stringify} from '../json/stringify';


/**
 * @param {string} keyPath
 * @return {Utils.dataBinder}
 */
export function removeData(keyPath) {
	if (keyPath) {
		deleteObject(dataBinderData, keyPath);
	}

	localStorage.setItem(DATA_BINDER_LOCAL_STORAGE_KEY, stringify(dataBinderData));

	return dataBinder;
}
