describe('Data Binder', function () {
	var workspaceElement;

	beforeEach(function () {
		workspaceElement = testHelpers.getWorkspaceElement();
	});

	it('Add data, Remove Data, On change', function () {
		workspaceElement.innerHTML = '<input id="databinder-test" data-bind="name">';
		var inputElement = workspaceElement.querySelector('#databinder-test');

		inputElement.value = 'Test';
		Utils.dom.trigger(inputElement, 'change');
		workspaceElement.innerHTML = '<input id="databinder-test" data-bind="name">';
		assert.equal(workspaceElement.querySelector('#databinder-test').value, '');

		Utils.dataBinder.bindData();
		assert.equal(workspaceElement.querySelector('#databinder-test').value, 'Test');

		workspaceElement.innerHTML = '<input id="databinder-test" data-bind="name">';
		Utils.dataBinder.removeData('name');
		Utils.dataBinder.bindData();
		assert.equal(workspaceElement.querySelector('#databinder-test').value, '');
	});

});
