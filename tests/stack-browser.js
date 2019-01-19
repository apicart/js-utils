(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	/* eslint-disable max-nested-callbacks, max-len, max-nested-callbacks */

	describe('DOM', function () {
		var
			dom = Utils.dom,
			workspaceElement;

		beforeEach(function () {
			workspaceElement = document.getElementById('workspace');
		});

		describe('on()', function () {
			describe('click', function () {
				it('Check click on button. Button should have two added classes.', function () {
					dom
						.on('click', 'button.test-button', function () {
							dom.addClass(this, 'click');
						})
						.on('click', 'button.test-button.click', function () {
							dom.addClass(this, 'second-click');
						});

					workspaceElement.innerHTML = '<button class="test-button"></button>';
					testHelpers.simulateEvent(document.querySelector('button.test-button'), 'click');
					testHelpers.simulateEvent(document.querySelector('button.test-button'), 'click');
					var testElementClasses = document.querySelector('button.test-button').classList;

					assert.equal('test-button click second-click', testElementClasses);
				});
			});

			describe('change', function () {
				it('Check input change. Input should have one added class.', function () {
					dom.on('change', 'input.test-input', function () {
						dom.addClass(this, 'changed');
					});
					workspaceElement.innerHTML = '<input class="test-input">';
					testHelpers.simulateEvent(document.querySelector('input.test-input'), 'change');
					var testElementClasses = document.querySelector('input.test-input').classList;

					assert.equal('test-input changed', testElementClasses);
				});
			});
		});

		describe('findParent()', function () {
			it('Find parent with given class.', function () {
				workspaceElement.innerHTML = '<div class="test-parent test-parent-2"><div class="test-parent test-parent-1"><div><div class="test-child"></div></div></div></div>';
				var parent = dom.findParent(document.querySelector('.test-child'), '.test-parent');
				assert.isOk(true, parent.classList.contains('test-parent-1'));
			});
		});

		describe('addClass(), removeClass()', function () {
			it('Remove class from selected element', function () {
				workspaceElement.innerHTML = '<div class="classA classB"></div>';
				dom.addClass(document.querySelector('div.classA'), 'classC classD');
				dom.removeClass(document.querySelector('div.classA'), 'classB classC');
				assert.equal('classA classD', document.querySelector('.classA').classList);
			});
		});
	});

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

			assert.equal(3, a);
			assert.equal(3, b);
		});
	});

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

	describe('Strings', function () {
		var strings = Utils.strings;

		describe('generateHash()', function () {
			it('Random, 32 characters long hash.', function () {
				var hash = strings.generateHash(32);
				assert.equal(32, hash.length);
			});

			it('Numeral, 32 characters long hash.', function () {
				var hash = strings.generateHash(32, '0123456789');
				assert.equal(1, hash.match(/\d+/g).length);
			});
		});

		describe('sprintf()', function () {
			it('Replace matches by variables from array', function () {
				var string = strings.sprintf('%0% is the %1%! %0% %2%!', ['Apicart', 'best', 'rocks']);
				assert.equal('Apicart is the best! Apicart rocks!', string);
			});

			it('Replace matches by variables from object', function () {
				var string = strings.sprintf('%param1% is the %param2%! %param1% %param3%!', {
					param1: 'Apicart',
					param2: 'best',
					param3: 'rocks'
				});
				assert.equal('Apicart is the best! Apicart rocks!', string);
			});
		});

	});

}));
