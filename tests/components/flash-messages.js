describe('Flash messages', function () {
	var flashMessages = Utils.flashMessages;

	it('Add flash messages.', function () {
		flashMessages
			.addMessage('First message')
			.addMessage('Second message', 'warning')
			.addMessage('Third message', 'danger');

		assert.equal(3, Object.keys(flashMessages.getMessages()).length);
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

		assert.equal('First message', infoMessage);
		assert.equal('Second message', warningMessage);
		assert.equal('Third message', dangerMessage);
	});

	it('Check iteration over selected type of messages.', function () {
		var dangerMessage;

		flashMessages.addMessage('First message', 'danger');

		if (flashMessages.hasMessages()) {
			flashMessages.processMessages(function (content) {
				dangerMessage = content;
			}, 'danger');
		}

		assert.equal('First message', dangerMessage);
	});
});
