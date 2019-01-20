describe('Json', function () {
	var json = Utils.json;

	it('isJson()', function () {
		assert.equal(json.isJson(true), false);
		assert.equal(json.isJson(''), false);
		assert.equal(json.isJson([]), false);
		assert.equal(json.isJson({}), false);
		assert.equal(json.isJson('{}'), true);
	});

	it('parse()', function () {
		expect({}).to.deep.equal(json.parse(''));
		expect({a: 1, b: 2}).to.deep.equal(json.parse('{"a":1,"b":2}'));
	});

	it('stringify()', function () {
		assert.equal(json.stringify({}), '{}');
		assert.equal(json.stringify({a: 1, b: 2}), '{"a":1,"b":2}');
	});

});
