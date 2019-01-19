import {
	DATA_BINDER_BIND_IF_EMPTY_CONDITION,
	DATA_BINDER_DATA_BOUND_ATTRIBUTE, DATA_BINDER_ELEMENTS_WITH_VALUE_ATTRIBUTE,
	DATA_BINDER_PREFIX,
	DATA_BINDER_SELECTOR, dataBinder,
	dataBinderData
} from './dataBinder';
import {loops} from '../loops/loops';
import {objects} from '../objects/objects';


document.addEventListener('DOMContentLoaded', function () {
	bindData();
});

/**
 * @param {boolean|null} all
 * @return {Utils.dataBinder}
 */
export function bindData(all) {
	all = all || false;

	var elements = document.querySelectorAll(
		all ? DATA_BINDER_SELECTOR : DATA_BINDER_SELECTOR + ':not([' + DATA_BINDER_DATA_BOUND_ATTRIBUTE + '])'
	);

	loops.forEach(elements, function (key, element) {
		var keyPath = element.getAttribute(DATA_BINDER_PREFIX);

		if ( ! keyPath) {
			return;
		}

		var data = objects.find(dataBinderData, keyPath);

		if ( ! data) {
			return;
		}

		var
			bindCondition = element.getAttribute(DATA_BINDER_PREFIX + '-if'),
			elementTagName = element.tagName.toLowerCase();

		if (DATA_BINDER_ELEMENTS_WITH_VALUE_ATTRIBUTE.indexOf(elementTagName) > -1) {
			if (bindCondition === DATA_BINDER_BIND_IF_EMPTY_CONDITION && element.value) {
				return;
			}

			if (elementTagName === 'input'
				&& element.getAttribute('type') === 'radio'
				&& element.getAttribute('name')
			) {
				document.querySelector('[name="' + element.getAttribute('name') + '"][value="' + data +'"]')
					.checked = true;

			} else {
				element.value = data;
			}

		} else {
			if (bindCondition === DATA_BINDER_BIND_IF_EMPTY_CONDITION && element.innerHTML.trim()) {
				return;
			}

			element.innerHTML = data;
		}

		element.setAttribute(DATA_BINDER_DATA_BOUND_ATTRIBUTE, true);
	});

	return dataBinder;
}
