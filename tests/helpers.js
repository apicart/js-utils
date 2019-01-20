var helpers = {};

document = document.implementation.createHTMLDocument("Test Document");
document.body.innerHTML += '<div id="workspace"></div>';

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
