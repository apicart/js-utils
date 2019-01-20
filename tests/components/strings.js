describe('Strings', function () {
	var strings = Utils.strings;

	describe('generateHash()', function () {
		it('Random, 32 characters long hash.', function () {
			var hash = strings.generateHash(32);
			assert.equal(32, hash.length);
		});

		it('Numeral, 32 characters long hash.', function () {
			var hash = strings.generateHash(32, '0123456789');
			assert.equal(hash.match(/\d+/g).length, 1);
		});
	});

	describe('sprintf()', function () {
		it('Replace matches by variables from array', function () {
			var string = strings.sprintf('%0% is the %1%! %0% %2%!', ['Apicart', 'best', 'rocks']);
			assert.equal(string, 'Apicart is the best! Apicart rocks!');
		});

		it('Replace matches by variables from object', function () {
			var string = strings.sprintf('%param1% is the %param2%! %param1% %param3%!', {
				param1: 'Apicart',
				param2: 'best',
				param3: 'rocks'
			});
			assert.equal(string, 'Apicart is the best! Apicart rocks!');
		});
	});

});
