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
      buildElementFromValue(object[key], el);    
    } else if (Array.isArray(object[key])) {
      buildElementFromValue(object, element)
    } else if(!element.firstElementChild) {
      buildElementFromValue(JSON.stringify(object, null, 2), element)
    }
  }
}

const buildFromArray = (element, items) => {
  const template = element.querySelector('*[blueprint]')
  for(let item of items) {
    const clone = template.cloneNode(true)
    // const textNode = document.createTextNode(item)
    // clone.appendChild(textNode)
    template.parentElement.insertBefore(clone, template)
    buildElementFromValue(item, clone)
  }
  template.parentElement.removeChild(template)
}

const buildElementFromValue = (value, element) => {
  switch (typeof value) {
    case 'string':
    case 'number':
    
      if(element.hasAttribute('markdown')) {
        const markdown = converter.makeHtml(value);
        element.innerHTML = markdown
      } else {
        const textNode = document.createTextNode(value)
        if(element.hasAttribute('with-default')) element.innerHTML = value
        else element.appendChild(textNode)  
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

// const Silence = {
//   register: (key, object) => {
//     localStorage.setItem(`silence-${key}`, object)
//     return this
//   }
// }



