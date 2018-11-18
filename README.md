# Silence

🤫

HTML Template for [Panopticon](https://github.com/antiPhaseDomain/Panopticon) to use.

## (Verified) Features

* ES6/7
* CSS Variables
* CSS Filters
* CSS Grid

Plus, you can use the following syntax for any GET request that returns a json object:

```html
<json-{key}></json-{key}>
```
Where `key` is the desired key name from the set json object.

## Quick Start

For the following json object ` { version: 2; } `, `<json-version></json-version>` will be populated with `2`.

## Example

```html
<p>We're currently on <json-version></json-version>!</p>
```

## Setting the JSON

In [main.js](https://github.com/antiPhaseDomain/Silence/blob/master/assets/scripts/main.js) on line [14](https://github.com/antiPhaseDomain/Silence/blob/master/assets/scripts/main.js#L14) is where [fetch](https://css-tricks.com/using-fetch/) is getting it's JSON from.



