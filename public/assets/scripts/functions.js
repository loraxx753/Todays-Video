import { SilenceChildElement } from './silence/SilenceChildElement.js';
import { script } from './elements.js'

var converter = new showdown.Converter();

// A quick function to add <script> tags to the end of <body>
function addScript(src, callback, options) {
  callback = (callback) ? callback : new Function() 
  const scriptClone = script.cloneNode(true);
  scriptClone.setAttribute('src', src)
  for(var key in options) {
    scriptClone.setAttribute(key, options[key])
  }
  document.body.appendChild(scriptClone)
  scriptClone.onload = callback
} 


export const guidGenerator = () => {
  return "ss-s-s-s-sss".replace(/s/g, s4);
}

export const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}


/* This function is the start of nesting */
export const setJsonChildren = (element, object) => {
  if(object) element.api = object  
  const element_array = element.tagName.toLowerCase().split('-')
  if(element_array.length > 1) element_array.shift();
  const element_key = element_array.join('-')
  for(let key in object) {
    const child_tag = `${element_key}-${key}`.toLocaleLowerCase()
    if(!customElements.get(child_tag)) {
      try {
        customElements.define(child_tag.toLocaleLowerCase(), class extends SilenceChildElement {})        
      } catch(e) {
        console.log(child_tag);
        console.log(e)
      }
    }

    const elements = element.querySelectorAll(child_tag)
    for(let element of elements) {
      // console.log(key, Array.isArray(object[key]), object[key])

      if(Array.isArray(object[key])) {
        buildFromArray(element, object)
      } else if(typeof object == 'object') {
        buildElementFromValue(object[key], element);    
      } else if(!element.firstElementChild) {
        buildElementFromValue(JSON.stringify(object, null, 2), element)
      }
    }
      
      // if(el) {
      // } else if (Array.isArray(object[key])) {
      //   buildElementFromValue(object, element)
      // } else if(!element.firstElementChild) {
      //   buildElementFromValue(JSON.stringify(object, null, 2), element)
      // }
    }
  }
  
  export const buildFromArray = (element, items) => {
    console.log(element)
    for(let item of items) {
      buildElementFromValue(item, element)
    }
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
  