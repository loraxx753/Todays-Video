# 🤫

_Now the template for [Panopticon](https://github.com/antiPhaseDomain/Panopticon)!_

## Silence Quickstart

```html
<json-{key}></json-{key}>
```
Where `key` is the desired key name from the set json object.

## Quick Start

For the following json object ` { foo: "bar"; } `, `<json-foo></json-foo>` will be populated with `bar`.

## Example

```html
<h1><json-foo></json-foo>!</h1>
<!-- HTML DOM : <h1><json-foo>bar</json-foo></h1> -->
```

Use [main.js](https://github.com/antiPhaseDomain/Silence/blob/master/assets/scripts/main.js) as if it were the main module file. 

## Setting the JSON

In [main.js](https://github.com/antiPhaseDomain/Silence/blob/master/assets/scripts/main.js) on line [14](https://github.com/antiPhaseDomain/Silence/blob/master/assets/scripts/main.js#L14) is where [fetch](https://css-tricks.com/using-fetch/) is getting it's JSON from.



