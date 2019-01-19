/* eslint-disable sort-keys */

describe('Objects', function () {
	var objects = Utils.objects;

	it('copy()', function () {
		var
			a = {x: 0},
			b,
			c = a;

		b = objects.copy(a);
		b.x = 2;

		c.x = 1;

		assert.equal(1, a.x);
		assert.equal(1, c.x);
		assert.equal(2, b.x);
	});

	it('values()', function () {
		var a = {x: 1, y: 2};

		expect([1, 2]).to.deep.equal(objects.values(a));
	});

	it('merge()', function () {
		var
			a = {x: 1, y: 2},
			b = {z: 3};

		expect({x: 1, y: 2, z: 3}).to.deep.equal(objects.merge(a, b));
	});

	it('assign()', function () {
		var a = {};

		objects.assign(a, 'x.y', 1);
		objects.assign(a, 'x.z.q', 2);

		expect({x: {y: 1, z: {q: 2}}}).to.deep.equal(a);
	});

	it('delete()', function () {
		var a = {x: {xy: {xyz: {xyzq: 1}}}, y: {z: 1, p: 2}, q: {w: 2}};

		objects.delete(a, 'q');
		expect({x: {xy: {xyz: {xyzq: 1}}}, y: {z: 1, p: 2}}).to.deep.equal(a);

		objects.delete(a, 'y.z');
		expect({x: {xy: {xyz: {xyzq: 1}}}, y: {p: 2}}).to.deep.equal(a);

		objects.delete(a, 'x.xy.xyz.xyzq');
		expect({x: {xy: {xyz: {}}}, y: {p: 2}}).to.deep.equal(a);
	});
});
/* eslint-enable sort-keys */
