describe('Validators', function () {

	it('Is Empty', function () {
		assert.isTrue(Utils.validators.isEmpty(''));
		assert.isTrue(Utils.validators.isEmpty([]));
		assert.isTrue(Utils.validators.isEmpty({}));

		var
			a,
			c = null;
		assert.isTrue(Utils.validators.isEmpty(a));
		(function (b) {
			assert.isTrue(Utils.validators.isEmpty(b));
		})();
		assert.isTrue(Utils.validators.isEmpty(c));

		assert.isFalse(Utils.validators.isEmpty(0));
	});

});
