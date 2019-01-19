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

- Malá sada užitečných utilit pro jednodušší vývoj.
- ✅ **7 Kb minifikovaný soubor, (3 Kb Gzipnutý)**
- ✅ Podporuje IE 10 +

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

## Instalace

### Cdn 
```html
<!-- Master version from Github -->
<script src="https://cdn.jsdelivr.net/gh/apicart/js-utils/dist/utils.min.js"></script>
```

## Ajax (Utils.ajax)
Ajaková komponenta zjednodušuje práci s XMLHttpRequest.

**Parametry**

| Parametr        | async    | cache    | data   | headers | method | timeout | url    | withCredentials | start         | complete      |
|-----------------|----------|----------|--------|---------|--------|---------|--------|-----------------|---------------|---------------|
| Typ             | boolean  | boolean  | object | object  | string | number  | string | boolean         | function      | function      |
| Výchozí hodnota | true     | true     | {}     | {}      | get    | 5000    | ''     | false           | function() {} | function() {} |

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
Konzole obaluje základní funkci console a zajišťuje tak funkci napříč prohlížeči.

**error(*mixed* $parametr, *mixed* $parametr, ...): *utils.console***
```js
Utils.console.error('Some', 'Value');
```

**log(*mixed* $parametr, *mixed* $parametr, ...): *utils.console***
```js
Utils.console.log('Some', 'Value');
```

**warn(*mixed* $parametr, *mixed* $parametr, ...): *utils.console***
```js
Utils.console.warn('Some', 'Value');
```

## DOM (Utils.dom)
DOM tato komponenta zjednodušuje práci s Document Object Model.

**matches(*Element* $element, *string* $selector): *boolean***

Vrací true, pokud element odpovídá selektoru. Pokud neodpovídá, vrací false.
```js
Utils.dom.matches(document.querySelector('.element', '.selected');
```

**on(*array*|*string* $eventTypes, *array*|*string* $selectors, *function*|*null* $callback): *utils.dom***

Připojuje posluchače na událost k elementům. Funguje i na dynamicky přidaných elementech.
```js
Utils.dom.on('click', '.element', function() {...});
```

**findParent(*Element* $element, *string* $selector): *Element*|*null***

Vrací rodiče elementu na základě selektoru. Pokud rodiče nenajde, vrací null.
```js
Utils.dom.findParent(Element $element, '.parent');
```

**addClass(*Element* $element, *string* $classes): *utils.dom***

Přidá jednu nebo více tříd k elementu.
```js
Utils.dom.addClass(document.querySelector('.element'), 'first second third');
```

**removeClass(*Element* $element, *string* $classes): *utils.dom***

Odebere jednu nebo více tříd z elementu.
```js
Utils.dom.removeClass(document.querySelector('.element'), 'first second third');
```

**trigger(*Element* $element, *string* $event): *utils.dom***

Spouští událost u daného elementu.
```js
Utils.dom.trigger(document.querySelector('.button'), 'click');
```

## Json (Utils.json)
**isJson(*string* $content): *boolean***

Kontroluje, jestli jsou daná data JSON. Pokud ano, vrací true. Pokud ne, vrací false.
```js
Utils.json.isJson('{a: "b"}'); // true
Utils.json.isJson('Text'); // false
```

**parse(*string* $content): *object***

Převádí json na javascriptový objekt.
```js
Utils.json.parse('{a: "b"}'); // {a: "b"}
```

**stringify(*object* $object): *string***

Převádí javascriptový objekt na json.
```js
Utils.json.stringify({a: "b"}); // "{a: "b"}"
```

## Loops (Utils.loops)
**forEach(*object*|*array* $iterable, *function* $callback): void**

Metoda, která zvládne iterovat nad objekty i polem.
```js
Utils.loops.forEach([1, 2, 3], function(key, value) {...});
Utils.loops.forEach(document.querySelectorAll('.element'), function(key, element) {...});
```

## Objects (Utils.objects)
**assign(*object* $object, *string* $keyPath, *mixed* $value): *utils.objects***

Polyfill Object.assign pro starší prohlížeče. Umí vložit i vnořené hodnoty.
```js
var a = {x: 1};
Utils.objects.assign(a, 'y.z', 2); // {x: 1, y: {z: 2}}
```

**copy(*object* $object): *object***

Vrací novou kopii zadaného objektu. Kopie je bez reference ke kopírovanému objektu.
```js
Utils.objects.copy({a: "b"}); // {a: "b"}
```

**delete(*object* $object, *string* $keyPath): *utils.objects***

Odebere klíče z objektu. Zvládne odebrat i vnořené klíče.
```js
Utils.objects.delete({a: {b: {c: "1", d: "2"}}}, 'a.b.c'); // {a: {b: {d: "2"}}}
```

**find(*object* $object, *string* $keyPath): *mixed***

Tato metoda je schopna najít a vrátit hodnotu klíče. Klíč mohou být libovolně zanořené. Pokud klíč neexistuje, vrací null.
```js
Utils.objects.find({a: {b: {c: "1"}}}, 'a.b.c'); // 1
```

**isObject(*mixed* $data): *boolean***

Kontroluje, jestli jsou data objekt.
```js
Utils.objects.isObject({a: "b"}); // true
Utils.objects.isObject(null); // false
Utils.objects.isObject([]); // false
```

**merge(*object* $object1, *object* $object2, ...): *object***

Spojí dva objekty. Je možné spojovat i libovolně zanořené objekty. Vrací nový objekt, který je bez referencí k předchozím objektům.
```js
Utils.objects.merge({a: "1"}, {b: "2"}); // {a: "1", b: "2"}
Utils.objects.merge({a: {b: "1"}}, {a: {c: "2"}}); // {a: {b: "1", c: "2"}}
```

**values(*object* $object): *array***

Odstraní klíče daného objektu a vrátí jejich data.
```js
Utils.objects.values({a: "b", c: "d"}): // ["b", "d"]
```

## Strings (Utils.strings)
**firstToUpper(*string* $string): *string***

Převede první znak textu na velké písmeno.
```js
Utils.strings.firstToUpper('test') // Test
```

**generateHash(*integer* $length, *string*|*null* $characters = 'abcdefghijklmnopqrstuvwxyz0123456789'): *string***

Vytvoří hash o dané délce ze zadaných znaků.
```js
Utils.strings.generateHash(32) // 32 characters long hash
```

**sprintf(*string* $content, *object*|*array* $parameters): *string***

Nahrazuje placeholdery zadanými hodnotami.

```js
Utils.strings.sprintf('%0% je %1%', ['Apicart', 'nejlepší']) // Apicart je nejlepší
Utils.strings.sprintf('%spolecnost% je %hodnoceni%', {spolecnost: 'Apicart', hodnoceni: 'nejlepší'}) // Apicart je nejlepší
```

## Url (Utils.url)
**getQueryParameter(*string* $name, *string* $url): *\**|*null***

Vrací query parametr ze zadané url adresy. Pokud parametr nenajde, vrací null.

```js
Utils.url.getQueryParameter('number', 'https://example.com?number=1') // 1
```

## Validators (Utils.validators)
**isEmpty(*mixed* $data): *boolean***

Vrací true, jestliže je jsou zadaná data prázdná. Pokud ne, vrací false.

```js
Utils.validators.isEmpty([]) // true
Utils.validators.isEmpty({}) // true
Utils.validators.isEmpty('') // true
```

## Data Binder (Utils.dataBinder)
Data binder je komponenta, která ukládá data z formulářových prvků a automaticky je doplňuje po znovu načtení stránky.
Data se díky tomu neztratí například při přechodu mezi stránkami.

**Použítí s elementy**

Stačí přidat atribut `data-bind` a data v elementu se budou automaticky ukládat a vyplňovat. Klíče uvedené v parametru mohou být zanořené.
```html
<input data-bind="username">
<select data-bind="billing.method"></select>
```


**addData(*string* $keyPath, *string*|*number* $value): *utils.dataBinder***

Tato metoda přidá data k danému klíčy. Klíče mohou být zanořené.
```js
Utils.dataBinder.addData('name', 'Karel');
Utils.dataBinder.addData('addresses.billing.town', 'Praha');
```


**removeData(*string* $keyPath): *utils.dataBinder***

Odebere data dle zadaného klíče.

```js
Utils.dataBinder.addData('name');
Utils.dataBinder.addData('addresses.billing.town');
```


**bindData(*boolean* $all = false): *utils.dataBinder***

Touto metodou se zavolá vyplnění elementů. Pokud se uvede all, vyplní i již vyplněné elementy.

```js
Utils.dataBinder.bindData() // Vyplní pouze to, co ještě není vyplněné/změněné
Utils.dataBinder.bindData(true) // Vyplní vše
```

## Event Dispatcher (Utils.eventDispatcher)
Event dispatcher umožňuje komponentám mezi sebou komunikovat na základě událostí.
V přápadě například vložení produktu do košíku se spůstí událost "Přidán produkt"
a všechny komponenty, které na tuto událost čekají, provedou nějakou akci. Mohou tedy
například zobrazit popup "Produkt byl přidán úspěšně do košíku".
Apicart má již v základu několik událostí, které můžete využít. Přečíst si o nich můžete v sekci [události]().

**addListener(*string* $listenerKey, *string*|*array* $eventName, *function* $callback, *boolean*|*null* $singleAction = false)**

Tato metoda zaregistruje posluchače na událost. Je možné uvést, že se provede pouze jednou, nastavením `singleAction` parametru na true.
```js
Utils.eventDispatcher.addListener('vypis-cislo', 'rozesli-cislo', function (cislo) {
    console.log(cislo);
}, true); // Single action je nastavena na true, provede se pouze jednou, pak se odebere (hodí se u dynamicky generovaných posluchačů)
Utils.eventDispatcher.addListener('produktovy-popup', 'produkt-pridan-do-kosiku', function (parametry) {...});
```


**removeListener(*string*|*array* $listenerKey, *string*|*array* $event): *utils.eventDispatcher***

Odebere posluchače.
```js
Utils.eventDispatcher.removeListener('posluchač', 'událost1 událost2');
Utils.eventDispatcher.removeListener('posluchač', ['událost1', 'událost2']);
Utils.eventDispatcher.removeListener('vypis-cislo', 'rozesli-cislo');
```

**dispatchEvent(*string*|*array* $event, *mixed*|*null* $parameters): *utils.evendDispatcher***

Vyvolá událost. Posluchačům je možné předat argumenty.
```js
Utils.eventDispatcher.dispatchEvent('událost1 událost2');
Utils.eventDispatcher.dispatchEvent(['událost1', 'událost2']);
Utils.eventDispatcher.dispatchEvent('rozesli-cislo', 1);
```

## Flash Messages (Utils.flashMessages)
Flash message umožňují udržovat zprávy napříč redirekty. Pokud je například uživatel přesměrován
z nějaké stránky a po dokončení přesměrování chcete zobrazit zprávu, stačí ji přidat do flash message
a poté zpracovat.

**addMessage(*string* $content, *string*|*null* $type = 'info'): *utils.flashMessages***

Přidá zprávu. Je možné uvést typ.
```js
Utils.flashMessages.addMessage('Text');
Utils.flashMessages.addMessage('Pozor', 'warning');
```

**getMessages(): *object***

Vrací objekt se zprávami.
```js
Utils.flashMessages.getMessages();
```

**hasMessages(): *boolean***

Vrací true, pokud jsou nějaké zprávy k dispozici.
```js
Utils.flashMessages.hasMessages();
```

**processMessages(*function* $callback, *string*|*null* $type): *utils.flashMessages***

Provede iteraci nad všema zprávama. Pokud je zadán typ, provede se iterace pouze nad zvolenými zprávami.
```js
Utils.flashMessages.processMessages(function (message, type) { // Zpracuje všechny zprávy });
Utils.flashMessages.processMessages(function (message, typ) { // Zpracuje pouze zprávy s typem info }, 'info');
```
