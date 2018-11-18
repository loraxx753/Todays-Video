# Silence

🤫

HTML Template for [Panopticon](https://github.com/antiPhaseDomain/Panopticon) to use.

You can use this folder structure and write with any of the following features available in IE11:

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

```
<p>We're currently on <json-version></json-version>!</p>

```

