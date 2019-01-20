var helpers = {};


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

window.testHelpers = helpers;
