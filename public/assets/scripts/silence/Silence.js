import { guidGenerator } from '../functions.js'

export class Silence extends HTMLElement {
    constructor() {
        super()
        this.debugging = !!(sessionStorage.getItem('debug'))
        this.classList.add('silent-element')
    }

    connectedCallback() {
    }

    getSilenceElement(element) {
        const $this = element || this;
        if($this.parentElement.tagName.toLowerCase() != 'silence-api') return this.getSilenceElement($this.parentElement)
        else return $this.parentElement
    }
    getSilenceParent(element) {
        const $this = element || this;
        console.log($this)
        if(!$this.parentElement.classList.contains('silence-element') || $this.parentElement.tagName.toLowerCase() == 'silence-api') return this.getSilenceParent($this.parentElement)
        else return $this.parentElement
    }


    async populateChildren() {
        const namespace = this.getAttribute('name')
        for(let key in this.response) {
            const elements = document.querySelectorAll(`${namespace}-${key}`)

            if(elements.length) {
                if(!(customElements.get(`${namespace}-${key}`))) {
                    customElements.define(`${namespace}-${key}`, class extends SilenceChildElement { constructor() { super () }});
                }
                for(let element of elements) {
                    if(typeof this.response[key] == 'object') {
                        const guid = guidGenerator();
                        localStorage.setItem(`silence-${guid}`, JSON.stringify(this.response[key]))
                        element.setAttribute('guid', guid)
                    } 
                    else element.innerHTML = this.response[key]
                }
            }
        }
        await this.registerDebugElements()
    }

}