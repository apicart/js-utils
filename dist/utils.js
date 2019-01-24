/** 
 * utils.js v1.0.0-alpha1 
 * (c) 2018-2019 Vladimír Macháček
 *  Released under the MIT License.
 */
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	/**
	 * @param {{}|[]} iterable
	 * @param {function} callback
	 * @return {loops}
	 */
	function forEach(iterable, callback) {
		var
			iterator,
			iterableLength,
			statement,
			keys,
			keysLength,
			key;

		if (typeof iterable === 'undefined' || iterable === null) {
			return;
		}

		if (Array.isArray(iterable)) {
			iterableLength = iterable.length;

			if ( ! iterableLength) {
				return;
			}

			for (iterator = 0; iterator < iterableLength; iterator ++) {
				statement = callback(iterator, iterable[iterator]);

				if (statement === false) {
					break;
				}
			}

		} else {
			keys = Object.keys(iterable);
			keysLength = keys.length;

			if ( ! keysLength) {
				return;
			}

			for (iterator = 0; iterator < keysLength; iterator ++) {
				key = keys[iterator];
				statement = callback(key, iterable[key]);

				if (statement === false) {
					break;
				}
			}
		}

		return loops;
	}

	var loops = {
		forEach: forEach
	};

	/**
	 * @param {string} string
	 * @return {string}
	 */
	function firstToUpper(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * @param {number} length
	 * @param {string|null} characters
	 * @return {string}
	 */
	function generateHash(length, characters) {
		var hash = '';

		characters = characters || 'abcdefghijklmnopqrstuvwxyz0123456789';

		while (length--) {
			hash += characters.charAt(Math.floor(Math.random() * characters.length));
		}

		return hash;
	}

	/**
	 * @param {string} content
	 * @param {{}|[]}parameters
	 * @return {string}
	 */
	function sprintf(content, parameters) {
		loops.forEach(parameters, function (key, value) {
			if (['number', 'string'].indexOf(typeof value) === -1) {
				return;
			}

			content = content.replace(new RegExp('%' + key + '%', 'g'), value);
		});

		return content;
	}

	var strings = {
		firstToUpper: firstToUpper,
		generateHash: generateHash,
		sprintf: sprintf
	};

	/**
	 * @param {*} data
	 * @return {boolean}
	 */
	function isEmpty(data) {
		var dataType = typeof data;

		if (dataType === 'undefined' || data === null) {
			return true;
		}

		if (dataType === 'number') {
			return false;

		} else if (dataType === 'string') {
			return !! data.length;

		} else if (dataType === 'object' || Array.isArray(data)) {
			return Object.keys(data).length < 1;
		}
	}

	var validators = {
		isEmpty: isEmpty
	};

	/**
	 * @param {{}} object
	 * @param {string|array} keyPath
	 * @param {*} value
	 * @return {Utils.objects}
	 */
	function assign(object, keyPath, value) {
		if (typeof keyPath === 'string') {
			keyPath = keyPath.split('.');
		}

		var
			key,
			lastKeyIndex = keyPath.length - 1;

		for (var i = 0; i < lastKeyIndex; ++ i) {
			key = keyPath[i];

			if ( ! (key in object)) {
				object[key] = {};
			}

			object = object[key];
		}

		object[keyPath[lastKeyIndex]] = value;

		return objects;
	}

	/**
	 * @param {{}} object
	 * @return {{}}
	 */
	function copy(object) {
		var newObject = {};

		loops.forEach(object, function (key, value) {
			newObject[key] = objects.isObject(value) ? objects.copy(value) : value;
		});

		return newObject;
	}

	/**
	 * @param {{}} object
	 * @param {string|array} keyPath
	 * @return {Utils.objects}
	 */
	function deleteObject(object, keyPath) {
		if (typeof keyPath === 'string') {
			keyPath = keyPath.split('.');
		}

		if (keyPath.length > 1) {
			loops.forEach(keyPath, function (index, key) {
				if (typeof object[key] !== 'object') {
					return false;
				}

				object = object[key];
			});
		}

		delete object[keyPath.pop()];

		return objects;
	}

	/**
	 * @param {{}} object
	 * @param {string[]|string} keyPath
	 * @return {*|null}
	 */
	function find(object, keyPath) {
		if ( ! keyPath || ! object || typeof object !== 'object') {
			return null;
		}

		if (typeof keyPath === 'string') {
			keyPath = keyPath.split('.');
		}

		var wrongKeyPath = false;
		if (keyPath.length > 1) {
			loops.forEach(keyPath, function (key, keyPathPart) {
				if (typeof object !== 'object' || ! (keyPathPart in object)) {
					wrongKeyPath = true;
					return false;
				}

				if (typeof object[keyPathPart] !== 'object') {
					return false;
				}

				object = object[keyPathPart];
			});
		}

		return wrongKeyPath ? null : object[keyPath.pop()];
	}

	/**
	 * @param {*} data
	 * @return {boolean}
	 */
	function isObject(data) {
		if (typeof data === 'undefined' || data === null || Array.isArray(data)) {
			return false;
		}

		return typeof data === 'object';
	}

	/**
	 * @param objects
	 * @return {{}}
	 */
	function merge() {
		var
			newObject = {},
			iterable = Array.prototype.slice.call(arguments);

		loops.forEach(iterable, function (objectKey, object) {
			loops.forEach(object, function (key, value) {
				newObject[key] = ! (key in newObject) || ! objects.isObject(value)
					? value
					: objects.merge(newObject[key], value);
			});
		});

		return newObject;
	}

	/**
	 * @param {{}} object
	 * @return {Array}
	 */
	function values(object) {
		var values = [];

		loops.forEach(object, function (key, value) {
			values.push(value);
		});

		return values;
	}

	var objects = {
		assign: assign,
		copy: copy,
		delete: deleteObject,
		find: find,
		isObject: isObject,
		merge: merge,
		values: values
	};

	/**
	 * @param {Object} parameters
	 */
	function ajax(parameters) {
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
			requestConfiguration.queryParameters['h'] = strings.generateHash(10);
		}

		if (requestConfiguration.method === 'get') {
			requestConfiguration.queryParameters = objects.merge(
				requestConfiguration.queryParameters, requestConfiguration.data
			);
			requestConfiguration.data = {};
		}

		if ( ! validators.isEmpty(requestConfiguration.queryParameters)) {
			if ( ! requestConfigurationUrlHasParameters) {
				requestConfiguration.url += '?';
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

	/**
	 * @return {utilsConsole}
	 */
	function error() {
		if (typeof console.error !== 'undefined') {
			console.error.apply(null, Array.prototype.slice.call(arguments));
		}

		return console$1;
	}

	/**
	 * @return {Utils.console}
	 */
	function log() {
		if (typeof console.log !== 'undefined') {
			console.log.apply(null, Array.prototype.slice.call(arguments));
		}

		return console$1;
	}

	/**
	 * @return {Utils.console}
	 */
	function warn() {
		if (typeof console.warn !== 'undefined') {
			console.warn.apply(null, Array.prototype.slice.call(arguments));
		}

		return console$1;
	}

	var console$1 = {
		error: error,
		log: log,
		warn: warn
	};

	/**
	 * @param {string} content
	 * @return {boolean}
	 */
	function isJson(content) {
		if (typeof content !== 'string') {
			return false;
		}

		try {
			JSON.parse(content);

		} catch (e) {
			return false;
		}

		return true;
	}

	/**
	 * @param {{}} object
	 * @return {string}
	 */
	function stringify(object) {
		return typeof object === 'object' ? JSON.stringify(object) : '';
	}

	var json$1 = {
		isJson: isJson,
		parse: parse,
		stringify: stringify
	};

	/**
	 * @param {string} content
	 * @return {{}}
	 */
	function parse(content) {
		return json$1.isJson(content) ? JSON.parse(content) : {};
	}

	var elementPrototype = Element.prototype;


	/**
	 * @param {Element} element
	 * @param {string} selector
	 * @return {boolean}
	 */
	function matches(element, selector) {
		if (elementPrototype.matches) {
			return element.matches(selector);

		} else if (elementPrototype.msMatchesSelector) {
			return element.msMatchesSelector(selector);
		}

		return false;
	}

	/**
	 * @param {string} eventTypes
	 * @param {string} selectors
	 * @param {function} callback
	 * @return {Utils.dom}
	 */
	function on(eventTypes, selectors, callback) {
		if (typeof eventTypes === 'string') {
			eventTypes = eventTypes.split(' ');
		}

		if (typeof selectors === 'string') {
			selectors = selectors.split(',');
		}

		loops.forEach(selectors, function (key, selector) {
			loops.forEach(eventTypes, function (key, eventType) {
				(function (selector, eventType) {
					document.addEventListener(eventType, function (event) {
						var target = event.target;

						if (target === document) {
							return;
						}

						while (target && target !== this && ! dom.matches(target, selector)) {
							target = target.parentNode;
						}

						if (target && target !== this) {
							event.preventDefault();
							callback.call(target, event);
						}
					});
				})(selector, eventType);
			});
		});

		return dom;
	}

	/**
	 * @param {Element} element
	 * @param {string} selector
	 * @return {Element|null}
	 */

	function findParent(element, selector) {
		var parent = null;

		/* eslint-disable-next-line no-cond-assign */
		while (element = element.parentElement) {
			if (dom.matches(element, selector)) {
				parent = element;
				break;
			}
		}

		return parent;
	}

	/**
	 * @param {Element} element
	 * @param {string|array} classes
	 * @return {Utils.dom}
	 */
	function addClass(element, classes) {
		if (typeof classes === 'string') {
			classes = classes.split(' ');
		}

		loops.forEach(classes, function (key, newClass) {
			if ( ! element.classList.contains(newClass)) {
				element.className += ' ' + newClass;
			}
		});

		element.className = element.className.trim();

		return dom;
	}

	/**
	 * @param {Element} element
	 * @param {string} classes
	 * @return {Utils.dom}
	 */
	function removeClass(element, classes) {
		classes = classes.replace(' ', '|');
		element.className = element.className.replace(new RegExp(classes, 'g'), '').trim();
		element.className = element.className.replace(/\s+/, ' ');

		return dom;
	}

	/**
	 * @param {Element|NodeList|[]} element
	 * @param {string} event
	 * @return {Utils.dom}
	 */
	function trigger(element, event) {
		if (element instanceof Element) {
			element = [element];
		}

		loops.forEach(element, function (key, elementItem) {
			var evt = new Event(event, {
				bubbles: true,
				cancelable: true,
				view: window
			});

			elementItem.dispatchEvent(evt);
		});

		return dom;
	}

	var dom = {
		addClass: addClass,
		findParent: findParent,
		matches: matches,
		on: on,
		removeClass: removeClass,
		trigger: trigger
	};

	dom.on('change', DATA_BINDER_SELECTOR, function () {
		addData(this.getAttribute(DATA_BINDER_PREFIX), this.value);
	});

	/**
	 * @param {string} keyPath
	 * @param {*} value
	 * @return {Utils.dataBinder}
	 */
	function addData(keyPath, value) {
		objects.assign(dataBinderData, keyPath, value);
		localStorage.setItem(DATA_BINDER_LOCAL_STORAGE_KEY, json$1.stringify(dataBinderData));

		return dataBinder;
	}

	document.addEventListener('DOMContentLoaded', function () {
		bindData();
	});

	/**
	 * @param {boolean|null} all
	 * @return {Utils.dataBinder}
	 */
	function bindData(all) {
		all = all || false;

		var elements = document.querySelectorAll(
			all ? DATA_BINDER_SELECTOR : DATA_BINDER_SELECTOR + ':not([' + DATA_BINDER_DATA_BOUND_ATTRIBUTE + '])'
		);

		loops.forEach(elements, function (key, element) {
			var keyPath = element.getAttribute(DATA_BINDER_PREFIX);

			if ( ! keyPath) {
				return;
			}

			var data = objects.find(dataBinderData, keyPath);

			if ( ! data) {
				return;
			}

			var
				bindCondition = element.getAttribute(DATA_BINDER_PREFIX + '-if'),
				elementTagName = element.tagName.toLowerCase();

			if (DATA_BINDER_ELEMENTS_WITH_VALUE_ATTRIBUTE.indexOf(elementTagName) > -1) {
				if (bindCondition === DATA_BINDER_BIND_IF_EMPTY_CONDITION && element.value) {
					return;
				}

				if (elementTagName === 'input'
					&& element.getAttribute('type') === 'radio'
					&& element.getAttribute('name')
				) {
					document.querySelector('[name="' + element.getAttribute('name') + '"][value="' + data +'"]')
						.checked = true;

				} else {
					element.value = data;
				}

			} else {
				if (bindCondition === DATA_BINDER_BIND_IF_EMPTY_CONDITION && element.innerHTML.trim()) {
					return;
				}

				element.innerHTML = data;
			}

			element.setAttribute(DATA_BINDER_DATA_BOUND_ATTRIBUTE, true);
		});

		return dataBinder;
	}

	/**
	 * @param {string} keyPath
	 * @return {Utils.dataBinder}
	 */
	function removeData(keyPath) {
		if (keyPath) {
			deleteObject(dataBinderData, keyPath);
		}

		localStorage.setItem(DATA_BINDER_LOCAL_STORAGE_KEY, stringify(dataBinderData));

		return dataBinder;
	}

	// TODO solve multicheckbox saving

	var DATA_BINDER_PREFIX = 'data-bind';
	var DATA_BINDER_ELEMENTS_WITH_VALUE_ATTRIBUTE = ['select', 'input'];
	var DATA_BINDER_LOCAL_STORAGE_KEY = 'apicart_data_binder_data';
	var DATA_BINDER_SELECTOR = '[' + DATA_BINDER_PREFIX + ']';
	var DATA_BINDER_DATA_BOUND_ATTRIBUTE = 'data-bound';
	var DATA_BINDER_BIND_IF_EMPTY_CONDITION = 'empty';
	var dataBinderLocalStorageData = localStorage.getItem(DATA_BINDER_LOCAL_STORAGE_KEY);
	var dataBinderData = dataBinderLocalStorageData ? parse(dataBinderLocalStorageData) : {};

	var dataBinder = {
		addData: addData,
		bindData: bindData,
		removeData: removeData
	};

	/**
	 * @param {string} listenerKey
	 * @param {string} event
	 * @param {function} callback
	 * @param {boolean} singleAction
	 * @return {Utils.eventDispatcher}
	 */
	function addListener(listenerKey, event, callback, singleAction) {
		singleAction = singleAction || false;

		if (typeof event === 'string') {
			event = event.split(' ');
		}

		loops.forEach(event, function (key, eventName) {
			if ( ! (eventName in eventsRegister)) {
				eventsRegister[eventName] = {};
			}

			eventsRegister[eventName][listenerKey] = {
				callback: callback,
				singleAction: singleAction
			};
		});

		return eventDispatcher;
	}

	/**
	 * @param {string} event
	 * @param {*|null} parameters
	 * @return {Utils.eventDispatcher}
	 */
	function dispatchEvent(event, parameters) {
		if ( ! Array.isArray(parameters)) {
			parameters = [parameters];
		}

		if (typeof event === 'string') {
			event = event.split(' ');
		}

		loops.forEach(event, function (key, eventName) {
			if ( ! (eventName in eventsRegister)) {
				return;
			}

			loops.forEach(eventsRegister[eventName], function (eventListenerKey, eventListener) {
				if (eventListener.singleAction) {
					eventDispatcher.removeListener(eventListenerKey, eventName);
				}

				eventListener.callback.apply(null, parameters);
			});
		});

		return eventDispatcher;
	}

	/**
	 * @param {string} listenerKey
	 * @param {string|array} event
	 * @return {Utils.eventDispatcher}
	 */
	function removeListener(listenerKey, event) {
		if (typeof event === 'string') {
			event = event.split(' ');
		}

		loops.forEach(event, function (key, eventName) {
			delete eventsRegister[eventName][listenerKey];
		});

		return eventDispatcher;
	}

	var eventsRegister = {};
	var eventDispatcher = {
		addListener: addListener,
		dispatchEvent: dispatchEvent,
		removeListener: removeListener
	};

	/**
	 * @param {string} content
	 * @param {string|null} type
	 * @return {Utils.flashMessages}
	 */

	function addMessage(content, type) {
		type = type || 'info';

		var flashMessagesItems = flashMessages.getMessages();

		if ( ! (type in flashMessagesItems)) {
			flashMessagesItems[type] = [];
		}

		flashMessagesItems[type].push(content);
		localStorage.setItem(FLASH_MESSAGES_STORAGE_KEY, json$1.stringify(flashMessagesItems));

		return flashMessages;
	}

	/**
	 * @return {{}}
	 */
	function getMessages() {
		var flashMessages$$1 = localStorage.getItem(FLASH_MESSAGES_STORAGE_KEY);
		flashMessages$$1 = flashMessages$$1 ? json$1.parse(flashMessages$$1) : {};

		return flashMessages$$1;
	}

	/**
	 *
	 * @param {string|null} type
	 * @return {boolean}
	 */
	function hasMessages(type) {
		var messages = flashMessages.getMessages();
		return type ? ! isEmpty(messages[type]) : ! isEmpty(messages);
	}

	/**
	 * @param {function} callback
	 * @param {string|null} type
	 * @return {Utils.flashMessages}
	 */
	function processMessages(callback, type) {
		var messages;

		if (typeof type === 'string' && flashMessages.hasMessages(type)) {
			messages = flashMessages.getMessages();
			loops.forEach(messages[type], function (key, message) {
				callback(message, type);
			});

		} else if (flashMessages.hasMessages()) {
			messages = flashMessages.getMessages();
			loops.forEach(messages, function (messagesType, messagesQueue) {
				if (validators.isEmpty(messagesQueue)) {
					return;
				}

				loops.forEach(messagesQueue, function (key, message) {
					callback(message, messagesType);
				});
			});
		}

		localStorage.setItem(FLASH_MESSAGES_STORAGE_KEY, json$1.stringify({}));
		return flashMessages;
	}

	var FLASH_MESSAGES_STORAGE_KEY = 'apicart_flash_messages';
	var flashMessages = {
		addMessage: addMessage,
		getMessages: getMessages,
		hasMessages: hasMessages,
		processMessages: processMessages
	};

	/**
	 *
	 * @param {string} name
	 * @param {string} url
	 * @return {string|null}
	 */
	function getQueryParameter(name, url) {
		url = url || window.location.href;
		name = name.replace(/[[\]]/g, '\\$&');

		var
			regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);

		if ( ! results) {
			return null;
		}

		if ( ! results[2]) {
			return '';
		}

		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	var url = {
		getQueryParameter: getQueryParameter
	};

	window[typeof utilsAlias === 'undefined' ? 'Utils' : utilsAlias] = {
		ajax: ajax,
		console: console$1,
		dataBinder: dataBinder,
		dom: dom,
		eventDispatcher: eventDispatcher,
		flashMessages: flashMessages,
		json: json$1,
		loops: loops,
		objects: objects,
		strings: strings,
		url: url,
		validators: validators
	};

}));
