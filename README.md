<h1 align="center">
	Js-Utils
	<br>
	<a href="https://travis-ci.org/apicart/js-utils">
		<img src="https://travis-ci.org/apicart/js-utils.svg?branch=master" alt="">
	</a>
	<a href="https://github.com/apicart/js-utils/blob/master/LICENSE">
		<img src="https://img.shields.io/github/license/apicart/js-utils.svg" alt="">
	</a>
</h1>

- A small set of useful utilities for simpler development.
- ✅ **7 Kb minified (3 Kb Gzipped)**
- ✅ Supports IE 10 +

**Content**
- [Ajax](https://github.com/apicart/js-utils#ajax-utilsajax)
- [Console](https://github.com/apicart/js-utils#console-utilsconsole)
- [DOM](https://github.com/apicart/js-utils#dom-utilsdom)
- [JSON](https://github.com/apicart/js-utils#json-utilsjson)
- [Loops](https://github.com/apicart/js-utils#loops-utilsloops)
- [Objects](https://github.com/apicart/js-utils#objects-utilsobjects)
- [Strings](https://github.com/apicart/js-utils#strings-utilsstrings)
- [Url](https://github.com/apicart/js-utils#url-utilsurl)
- [Validators](https://github.com/apicart/js-utils#validators-utilsvalidators)
- [Data Binder](https://github.com/apicart/js-utils#data-binder-utilsdatabinder)
- [Event Dispatcher](https://github.com/apicart/js-utils#event-dispatcher-utilseventdispatcher)
- [Flash Messages](https://github.com/apicart/js-utils#flash-messages-utilsflashmessages)

## Installation

### Cdn 
```html
<!-- Master version from Github -->
<script src="https://cdn.jsdelivr.net/gh/apicart/js-utils/dist/utils.min.js"></script>
```

## Ajax (Utils.ajax)
This component simplifies work with the XMLHttpRequest.

**Parameters**

| Parameter       | async    | cache    | data   | headers | method | timeout | url    | withCredentials | start         | complete      |
|-----------------|----------|----------|--------|---------|--------|---------|--------|-----------------|---------------|---------------|
| Type            | boolean  | boolean  | object | object  | string | number  | string | boolean         | function      | function      |
| Default value   | true     | true     | {}     | {}      | get    | 5000    | ''     | false           | function() {} | function() {} |

**ajax(*object* $parameters): *void***
```js
Utils.ajax({
    url: 'https://example.com',
    method: 'post',
    complete: function (request){
        alert('Done');
    }
});
```

## Console (Utils.console)
Wraps the default browser console and ensures the cross-browser compatibility.

**error(*mixed* $parameter, *mixed* $parameter, ...): *utils.console***
```js
Utils.console.error('Some', 'Value');
```

**log(*mixed* $parameter, *mixed* $parameter, ...): *utils.console***
```js
Utils.console.log('Some', 'Value');
```

**warn(*mixed* $parameter, *mixed* $parameter, ...): *utils.console***
```js
Utils.console.warn('Some', 'Value');
```

## DOM (Utils.dom)
Simplifies work with Document Object Model.

**matches(*Element* $element, *string* $selector): *boolean***

Returns true if element matches selector. If not, returns false.
```js
Utils.dom.matches(document.querySelector('.element', '.selected');
```

**on(*array*|*string* $eventTypes, *array*|*string* $selectors, *function*|*null* $callback): *utils.dom***

Adds event listener to selected elements. Works even on dynamically added elements.
```js
Utils.dom.on('click', '.element', function() {...});
```

**findParent(*Element* $element, *string* $selector): *Element*|*null***

Returns element parent based on selector. If the parent was not found, returns null.
```js
Utils.dom.findParent(Element $element, '.parent');
```

**addClass(*Element* $element, *string* $classes): *utils.dom***

Adds one or multiple classes to selected elements.
```js
Utils.dom.addClass(document.querySelector('.element'), 'first second third');
```

**removeClass(*Element* $element, *string* $classes): *utils.dom***

Removes one or multiple classes from selected elements.
```js
Utils.dom.removeClass(document.querySelector('.element'), 'first second third');
```

**trigger(*Element* $element, *string* $event): *utils.dom***

Triggers an event on selected element.
```js
Utils.dom.trigger(document.querySelector('.button'), 'click');
```

## Json (Utils.json)
**isJson(*string* $content): *boolean***

Checks if the provided data are json. If not returns false.
```js
Utils.json.isJson('{a: "b"}'); // true
Utils.json.isJson('Text'); // false
```

**parse(*string* $content): *object***

Converts json to object. If the provided data are not json, returns an empty object.
```js
Utils.json.parse('{a: "b"}'); // {a: "b"}
```

**stringify(*object* $object): *string***

Converts javascript object into json.
```js
Utils.json.stringify({a: "b"}); // "{a: "b"}"
```

## Loops (Utils.loops)
**forEach(*object*|*array* $iterable, *function* $callback): void**

Function that is able to iterate over objects and arrays.
```js
Utils.loops.forEach([1, 2, 3], function(key, value) {...});
Utils.loops.forEach(document.querySelectorAll('.element'), function(key, element) {...});
```

## Objects (Utils.objects)
**assign(*object* $object, *string* $keyPath, *mixed* $value): *utils.objects***

Polyfill of the Object.assign for older browsers. Is able to assign nested properties.
```js
var a = {x: 1};
Utils.objects.assign(a, 'y.z', 2); // {x: 1, y: {z: 2}}
```

**copy(*object* $object): *object***

Returns a new copy of the provided object. Object copy is without a reference to copied object.
```js
Utils.objects.copy({a: "b"}); // {a: "b"}
```

**delete(*object* $object, *string* $keyPath): *utils.objects***

Removes keys from object. Is able to remove nested keys.
```js
Utils.objects.delete({a: {b: {c: "1", d: "2"}}}, 'a.b.c'); // {a: {b: {d: "2"}}}
```

**find(*object* $object, *string* $keyPath): *mixed***

This method is able to find a value according to provided key. The key can be arbitrarily nested. If the key doesnt exists, returns null.
```js
Utils.objects.find({a: {b: {c: "1"}}}, 'a.b.c'); // 1
```

**isObject(*mixed* $data): *boolean***

Checks if the provided data are object.
```js
Utils.objects.isObject({a: "b"}); // true
Utils.objects.isObject(null); // false
Utils.objects.isObject([]); // false
```

**merge(*object* $object1, *object* $object2, ...): *object***

Merges two objects into a new one. The new object is without reference to the merged objects.
```js
Utils.objects.merge({a: "1"}, {b: "2"}); // {a: "1", b: "2"}
Utils.objects.merge({a: {b: "1"}}, {a: {c: "2"}}); // {a: {b: "1", c: "2"}}
```

**values(*object* $object): *array***

Removes keys from provided object and returns its data.
Odstraní klíče daného objektu a vrátí jejich data.
```
Utils.objects.values({a: "b", c: "d"}): // ["b", "d"]
```

## Strings (Utils.strings)
**firstToUpper(*string* $string): *string***

Converts first letter of the given string to upper case.
```js
Utils.strings.firstToUpper('test') // Test
```

**generateHash(*integer* $length, *string*|*null* $characters = 'abcdefghijklmnopqrstuvwxyz0123456789'): *string***

Generates hash from given characters and length.
Vytvoří hash o dané délce ze zadaných znaků.
```js
Utils.strings.generateHash(32) // 32 characters long hash
```

**sprintf(*string* $content, *object*|*array* $parameters): *string***

Replaces placeholders by given values.
```js
Utils.strings.sprintf('%0% je %1%', ['Apicart', 'nejlepší']) // Apicart je nejlepší
Utils.strings.sprintf('%spolecnost% je %hodnoceni%', {spolecnost: 'Apicart', hodnoceni: 'nejlepší'}) // Apicart je nejlepší
```

## Url (Utils.url)
**getQueryParameter(*string* $name, *string* $url): *\**|*null***

Returns query parameter from the given url. If the parameter was not found, returns null.
```js
Utils.url.getQueryParameter('number', 'https://example.com?number=1') // 1
```

## Validators (Utils.validators)
**isEmpty(*mixed* $data): *boolean***

Returns true if the provided data are empty. Otherwise returns false.
```js
Utils.validators.isEmpty([]) // true
Utils.validators.isEmpty({}) // true
Utils.validators.isEmpty('') // true
```

## Data Binder (Utils.dataBinder)

Data binder is a component, that saves data from form elements and fills them back automatically after the page refresh.

**Použítí s elementy**

All you need is to add the `data-bind` attribute to the element which data should be saved. Keys provided inside the attribute can be nested.
```html
<input data-bind="username">
<select data-bind="billing.method"></select>
```


**addData(*string* $keyPath, *string*|*number* $value): *utils.dataBinder***

This method adds data according to given key and value. Keys can be nested.
```js
Utils.dataBinder.addData('name', 'Karel');
Utils.dataBinder.addData('addresses.billing.town', 'Praha');
```


**removeData(*string* $keyPath): *utils.dataBinder***

Removes data according to the given key.
```js
Utils.dataBinder.addData('name');
Utils.dataBinder.addData('addresses.billing.town');
```


**bindData(*boolean* $all = false): *utils.dataBinder***

This method triggers the autofill. If the `all` parametr is set to true, it will fill all elements even those that were already filled.

```js
Utils.dataBinder.bindData() // Fills only those elements, that were not filled yet
Utils.dataBinder.bindData(true) // Fills all
```

## Event Dispatcher (Utils.eventDispatcher)

Event dispatcher allows you communicate between components based on events.
If for example a product was added into the cart, you can trigger `productAddedIntoCart` event.
Listeners waiting for this event will be triggered with given values.

**addListener(*string* $listenerKey, *string*|*array* $eventName, *function* $callback, *boolean*|*null* $singleAction = false)**

This method registers listener. If the `singleAction` parameter is set to true, the listener will be triggered only once (it is useful for dynamically generated listeners).
```js
Utils.eventDispatcher.addListener('number-dumper', 'send-number', function (number) {
    console.log(number);
}, true); // Single action is set to true, so the listener will be triggered only once
Utils.eventDispatcher.addListener('product-popup', 'product-added-into-cart', function (parameters) {...});
```


**removeListener(*string*|*array* $listenerKey, *string*|*array* $event): *utils.eventDispatcher***

Removes listener from given event.
```js
Utils.eventDispatcher.removeListener('posluchač', 'event1 event2');
Utils.eventDispatcher.removeListener('posluchač', ['event1', 'event2']);
Utils.eventDispatcher.removeListener('number-dumper', 'send-number');
```

**dispatchEvent(*string*|*array* $event, *mixed*|*null* $parameters): *utils.evendDispatcher***

Triggers selected event. Given parameters are provided to the listeners.
```js
Utils.eventDispatcher.dispatchEvent('event1 event2');
Utils.eventDispatcher.dispatchEvent(['event1', 'event2']);
Utils.eventDispatcher.dispatchEvent('rozesli-cislo', 1);
```

## Flash Messages (Utils.flashMessages)

Flash messages allows you to persist messages through redirects.

**addMessage(*string* $content, *string*|*null* $type = 'info'): *utils.flashMessages***

Adds message. You can provide a custom type.
```js
Utils.flashMessages.addMessage('Text');
Utils.flashMessages.addMessage('Warning!', 'warning');
```

**getMessages(): *object***

Returns messages.
```js
Utils.flashMessages.getMessages();
```

**hasMessages(): *boolean***

Returns true if there are some persisted messages.
```js
Utils.flashMessages.hasMessages();
```

**processMessages(*function* $callback, *string*|*null* $type): *utils.flashMessages***

Iterates over messages. If the type is set, the iteration is done only over the messages of the given type.
```js
Utils.flashMessages.processMessages(function (message, type) { ... }); // Processes all messages
Utils.flashMessages.processMessages(function (message, typ) { ... }, 'info'); // Processes only the info messages
```
