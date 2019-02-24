// TODO solve multicheckbox and multiselect saving

import {parse} from '../json/parse';
import {addData} from './addData';
import {bindData} from './bindData';
import {removeData} from './removeData';
import {dom} from '../dom/dom';

export var DATA_BINDER_PREFIX = 'data-bind';
export var DATA_BINDER_ELEMENTS_WITH_VALUE_ATTRIBUTE = ['select', 'input'];
export var DATA_BINDER_LOCAL_STORAGE_KEY = 'apicart_data_binder_data';
export var DATA_BINDER_SELECTOR = '[' + DATA_BINDER_PREFIX + ']';
export var DATA_BINDER_DATA_BOUND_ATTRIBUTE = 'data-bound';
export var DATA_BINDER_BIND_IF_EMPTY_CONDITION = 'empty';
export var dataBinderLocalStorageData = localStorage.getItem(DATA_BINDER_LOCAL_STORAGE_KEY);
export var dataBinderData = dataBinderLocalStorageData ? parse(dataBinderLocalStorageData) : {};

dom.on('change', DATA_BINDER_SELECTOR, function () {
	addData(this.getAttribute(DATA_BINDER_PREFIX), this.value);
});

export var dataBinder = {
	addData: addData,
	bindData: bindData,
	removeData: removeData
};
