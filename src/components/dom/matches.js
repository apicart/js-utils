var elementPrototype = Element.prototype;


/**
 * @param {Element} element
 * @param {string} selector
 * @return {boolean}
 */
export function matches(element, selector) {
	if (elementPrototype.matches) {
		return element.matches(selector);

	} else if (elementPrototype.msMatchesSelector) {
		return element.msMatchesSelector(selector);
	}

	return false;
}
