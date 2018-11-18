const setJsonChildren = (element, object) => {
  const element_array = element.tagName.toLowerCase().split('-')
  element_array.shift();
  const element_key = element_array.join('-')
  for(let key in object) {
    const child_tag = `${element_key}-${key}`
    const el = element.querySelector(child_tag);
    // console.log(child_tag, el)
  }
}

(async () => {

  const json = await fetch("https://petstore.swagger.io/v2/swagger.json")
  .then(resp => { return resp.json() });

  for(let key in json) { 

    window.localStorage.setItem(key, json[key]);
    const json_element = document.querySelector(`json-${key}`)
    if(json_element) {
      if(typeof json[key] == 'object') {
        setJsonChildren(json_element, json[key])
      }
      const safe_text = (typeof json[key] !== 'string' && typeof json[key] !== 'number') ? JSON.stringify(json[key], null, 2) : json[key]
      const textNode = document.createTextNode(safe_text)
      json_element.appendChild(textNode);
      // json_element.replaceWith(textNode)
     }
  }

  if(document.querySelector('json-debug')) document.querySelector('json-debug').innerHTML = `<pre><code>${JSON.stringify(json, null, 2)}</code></pre>`
})()

