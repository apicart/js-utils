describe('Flash messages', function () {
	var flashMessages = Utils.flashMessages;

	it('Add flash messages.', function () {
		flashMessages
			.addMessage('First message')
			.addMessage('Second message', 'warning')
			.addMessage('Third message', 'danger');

		assert.equal(Object.keys(flashMessages.getMessages()).length, 3);
	});

	it('Check each message content.', function () {
		var
			dangerMessage,
			infoMessage,
			warningMessage;

		if (flashMessages.hasMessages()) {
			flashMessages.processMessages(function (content, type) {
				if (type === 'info') {
					infoMessage = content;

				} else if (type === 'warning') {
					warningMessage = content;

				} else if (type === 'danger') {
					dangerMessage = content;
				}
			});
		}

		assert.equal(infoMessage, 'First message');
		assert.equal(warningMessage, 'Second message');
		assert.equal(dangerMessage, 'Third message');
	});

	it('Check iteration over selected type of messages.', function () {
		var dangerMessage;

		flashMessages.addMessage('First message', 'danger');

		if (flashMessages.hasMessages()) {
			flashMessages.processMessages(function (content) {
				dangerMessage = content;
			}, 'danger');
		}

		assert.equal(dangerMessage, 'First message');
	});
});
