var converter = new showdown.Converter()

/* This function is the start of nesting */
const setJsonChildren = (element, object) => {
  const element_array = element.tagName.toLowerCase().split('-')
  element_array.shift();
  const element_key = element_array.join('-')
  for(let key in object) {
    const child_tag = `${element_key}-${key}`
    const el = element.querySelector(child_tag);
    if(el) {
      handleValueType(key, object[key], el);    
    } else if (Array.isArray(object[key])) {
      handleValueType(key, object, element)
    } else if(!element.firstElementChild) {
      handleValueType(key, JSON.stringify(object, null, 2), element)
    }
  }
}

const buildFromArray = (element, items) => {
  const template = element.querySelector('*[blueprint]')
  console.log(template);
  for(let item of items) {
    const clone = template.cloneNode(true)
    const textNode = document.createTextNode(item)
    clone.appendChild(textNode)
    element.insertBefore(clone, template)
  }
  template.parentElement.removeChild(template)

}

const handleValueType = (key, value, element) => {
  switch (typeof value) {
    case 'string':
    case 'number':
    
      if(element.hasAttribute('markdown')) {
        const markdown = converter.makeHtml(value);
        element.innerHTML = markdown
      } else {
        const textNode = document.createTextNode(value)
        element.appendChild(textNode)  
      }
      break;
    case 'object':
      if(Array.isArray(value) && element.firstChild) buildFromArray(element, value)
      else setJsonChildren(element, value)
      break;
    default:
      break;
  }
}


(async () => {
  const url = "https://petstore.swagger.io/v2/swagger.json"

  const json = await fetch(url)
  .then(resp => { return resp.json(url) });

  for(let key in json) { 

    const json_elements = document.querySelectorAll(`json-${key}`)
    for(let json_element of json_elements) {
      handleValueType(key, json[key], json_element)
    }
  }


  if(document.querySelector('json-debug')) document.querySelector('json-debug').innerHTML = `<details>
    <summary>Current JSON Object</summary>
    <pre><code>
      ${JSON.stringify(json, null, 2)}
    </code></pre>
  </details>`
})()

