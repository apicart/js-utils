describe('Event dispatcher', function () {
	var eventDispatcher = Utils.eventDispatcher;

	it('Add listeners and dispatch events.', function () {
		var
			a = 0,
			b = 0;

		eventDispatcher.addListener('firstEventListener1', 'firstEvent', function () {
			a += 1;
		});

		eventDispatcher.addListener('firstEventListener2', 'firstEvent', function () {
			a += 2;
		});

		eventDispatcher.addListener('secondEventListener', 'secondEvent', function () {
			b = 3;
		});

		eventDispatcher.dispatchEvent('firstEvent secondEvent');

		assert.equal(a, 3);
		assert.equal(b, 3);
	});
});
