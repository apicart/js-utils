var helpers = {};


/**
 * @param {Element|[]|NodeList} element
 * @param {string} event
 */
helpers.simulateEvent = function (element, event) {
	if (element instanceof Element) {
		element = [element];
	}

	var elementItem;
	for (elementItem of element) {
		var evt = new Event(event, {
			bubbles: true,
			cancelable: true,
			view: window
		});

		elementItem.dispatchEvent(evt);
	}
};


/**
 * @returns {Element}
 */
helpers.getWorkspaceElement = function () {
	var element = document.querySelector('#workspace');

	if ( ! element) {
		element = document.querySelector('body');
	}

	return element;
};

window.testHelpers = helpers;
