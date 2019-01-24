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
			queryParameters: {},
			data: {},
			headers: {
				'Content-Type': 'application/json'
			},
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

	var requestConfigurationUrlHasParameters = requestConfiguration.url.indexOf('?') > -1;

	if ( ! requestConfiguration.cache) {
		requestConfiguration.queryParameters['h'] = strings.generatehash(10);
	}

	if (requestConfiguration.method === 'get') {
		requestConfiguration.queryParameters = objects.merge(
			requestConfiguration.queryParameters, requestConfiguration.data
		);
		requestConfiguration.data = {};
	}

	if ( ! validators.isEmpty(requestConfiguration.queryParameters)) {
		if ( ! requestConfigurationUrlHasParameters) {
			requestConfiguration.url += '?'
		}

		var firstParameter = true;

		loops.forEach(requestConfiguration.queryParameters, function (parameter, value) {
			if ( ! firstParameter) {
				requestConfiguration.url += '&';
			}

			requestConfiguration.url += parameter + '=' + encodeURIComponent(value);
			firstParameter = false;
		});
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
		var responseObjectData = request.responseText;

		if (requestConfiguration.headers["Content-Type"] === 'application/json') {
			responseObjectData = json.parse(responseObjectData);
		}

		var responseObject = {
			config: requestConfiguration,
			data: responseObjectData,
			headers: request.headers,
			request: request,
			status: request.status,
			statusText: request.statusText
		};

		if (request.readyState === 2) {
			requestConfiguration.start(responseObject);

		} else if (request.readyState === 4) {
			requestConfiguration.complete(responseObject);
		}
	};

	if (typeof requestConfiguration.data !== 'string') {
		requestConfiguration.data = json.stringify(requestConfiguration.data);
	}

	if (validators.isEmpty(requestConfiguration.data)) {
		requestConfiguration.data = null;
	}

	request.send(requestConfiguration.data);
}
