import {
	DATA_BINDER_LOCAL_STORAGE_KEY,
	DATA_BINDER_PREFIX,
	DATA_BINDER_SELECTOR, dataBinder,
	dataBinderData
} from './dataBinder';
import {dom} from '../dom/dom';
import {objects} from '../objects/objects';
import {json} from '../json/json';


dom.on('change', DATA_BINDER_SELECTOR, function () {
	addData(this.getAttribute(DATA_BINDER_PREFIX), this.value);
});

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
