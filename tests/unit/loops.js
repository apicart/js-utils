describe('Loops', function () {

	it('forEach', function () {
		var
			oddValue,
			oddValueKey,
			evenValue,
			evenValueKey,
			firstValue,
			firstValueKey,
			firstValueIterator,
			lastValue,
			lastValueKey,
			lastValueIterator;

		Utils.loops.forEach(['a', 'b'], function (key, value) {
			if (this.isOdd()) {
				oddValue = value;
				oddValueKey = key;

			} else if (this.isEven()) {
				evenValue = value;
				evenValueKey = key;
			}

			if (this.isFirst()) {
				firstValue = value;
				firstValueKey = key;
				firstValueIterator = this.counter;

			} else if (this.isLast()) {
				lastValue = value;
				lastValueKey = key;
				lastValueIterator = this.counter;
			}
		});

		assert.equal(oddValue, 'a');
		assert.equal(oddValueKey, 0);

		assert.equal(evenValue, 'b');
		assert.equal(evenValueKey, 1);

		assert.equal(firstValue, 'a');
		assert.equal(firstValueKey, 0);
		assert.equal(firstValueIterator, 1);

		assert.equal(lastValue, 'b');
		assert.equal(lastValueKey, 1);
		assert.equal(lastValueIterator, 2);

		Utils.loops.forEach({'a': 'x', 'b': 'y'}, function (key, value) {
			if (this.isOdd()) {
				oddValue = value;
				oddValueKey = key;

			} else if (this.isEven()) {
				evenValue = value;
				evenValueKey = key;
			}

			if (this.isFirst()) {
				firstValue = value;
				firstValueKey = key;
				firstValueIterator = this.counter;

			} else if (this.isLast()) {
				lastValue = value;
				lastValueKey = key;
				lastValueIterator = this.counter;
			}
		});

		assert.equal(oddValue, 'x');
		assert.equal(oddValueKey, 'a');

		assert.equal(evenValue, 'y');
		assert.equal(evenValueKey, 'b');

		assert.equal(firstValue, 'x');
		assert.equal(firstValueKey, 'a');
		assert.equal(firstValueIterator, 1);

		assert.equal(lastValue, 'y');
		assert.equal(lastValueKey, 'b');
		assert.equal(lastValueIterator, 2);
	});

});
