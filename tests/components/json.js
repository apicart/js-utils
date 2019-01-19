describe('Json', function () {
	var json = Utils.json;

	it('isJson()', function () {
		assert.equal(false, json.isJson(true));
		assert.equal(false, json.isJson(''));
		assert.equal(false, json.isJson([]));
		assert.equal(false, json.isJson({}));
		assert.equal(true, json.isJson('{}'));
	});

	it('parse()', function () {
		expect({}).to.deep.equal(json.parse(''));
		expect({a: 1, b: 2}).to.deep.equal(json.parse('{"a":1,"b":2}'));
	});

	it('stringify()', function () {
		assert.equal('{}', json.stringify({}));
		assert.equal('{"a":1,"b":2}', json.stringify({a: 1, b: 2}));
	});

});
