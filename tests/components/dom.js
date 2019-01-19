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
