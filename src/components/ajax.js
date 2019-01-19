import {loops} from './loops/loops';
import {strings} from './strings/strings';
import {validators} from './validators/validators';


/**
 * @param {Object} parameters
 */
export function ajax(parameters) {
	/* eslint-disable sort-keys, no-empty-function */
	var
		requestConfiguration = {
			async: true,
			cache: true,
			data: {},
			headers: {},
			method: 'get',
			timeout: 5000,
			url: '',
			withCredentials: false,
			start: function () {},
			complete: function () {}
		};
	/* eslint-enable sort-keys, no-empty-function */

	loops.forEach(parameters, function (parameterKey, parameter) {
		requestConfiguration[parameterKey] = parameter;
	});

	if ( ! requestConfiguration.cache) {
		requestConfiguration.url += requestConfiguration.url.indexOf('?') === -1 ? '?' : '&';
		requestConfiguration.url += strings.generatehash(10);
	}

	var request = new XMLHttpRequest();
	request.open(requestConfiguration.method, requestConfiguration.url, requestConfiguration.async);

	if (requestConfiguration.async && requestConfiguration.timeout > 0) {
		request.timeout = requestConfiguration.timeout;
	}

	if ( ! validators.isEmpty(requestConfiguration.headers)) {
		loops.forEach(requestConfiguration.headers, function (headerKey, header) {
			request.setRequestHeader(headerKey, header);
		});
	}

	request.onreadystatechange = function () {
		if (request.readyState === 2) {
			requestConfiguration.start(request);

		} else if (request.readyState === 4) {
			requestConfiguration.complete(request);
		}
	};

	if (validators.isEmpty(requestConfiguration.data)) {
		request.send();

	} else {
		request.send(requestConfiguration.data);
	}
}
