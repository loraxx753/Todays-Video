import { Silence } from './Silence.js' 
import { SilenceDebug } from './SilenceDebug.js'

export class SilenceApi extends Silence {
    constructor() { 
        super()
        if(!this.hasAttribute('name')) console.error("<silence-api> requires a 'name' attribute!")
        if(!this.hasAttribute('url')) console.error("<silence-api> requires a 'url' attribute!")
        this.namespace = this.getAttribute('name')
        localStorage.clear()
    }

    get api() {
        return this.response;
    }

    async registerDebugElements() {
        if(document.querySelectorAll(`${this.namespace}-debug`).length > 0)    await customElements.define(`${this.namespace}-debug`, SilenceDebug);
    }

    async hasSingleElementCheck(element) {
        if(element.children.length !== 1) console.error(`There must be a single wrapping tag within arrays for <${element.tagName.toLocaleLowerCase()}>!`);
    }


    async connectedCallback() {        
        const url = this.getAttribute('url');
        this.response = await fetch(url).then(r => r.json())
        const silenceObject = {
            response: this.response,
            url,
            timestamp: Date.now()
        }
        localStorage.setItem(`silence-${this.namespace}`, JSON.stringify(silenceObject))
        
        if(this.debugging) await this.logRoot(this.response)
        
        if(this.innerHTML == '') await this.documentIfEmpty()
        else await this.populateChildren()
        var event = new CustomEvent("silence", {
            detail: {
                hazcheeseburger: true
            }
        });
        document.dispatchEvent(event);

    }

    async logRoot(response) {
        if(this.debugging) {
            console.groupCollapsed(`Silence Api Element (name: ${this.getAttribute('name')})`)
            console.log("Root Silence Tag", this);
            if(this.hasAttribute('url')) {
                console.groupCollapsed(`Api Response (${this.getAttribute('url')})`)
                for(let key in response) {
                    console.groupCollapsed(key)
                    console.log(response[key])
                    console.groupEnd(key)
                }
                console.log(response);
                console.groupEnd(`Api Response ${this.getAttribute('url')}`)
    

            }
            console.groupEnd()
        }
    }

    
    async documentIfEmpty() {
        this.innerHTML = `
            <h2>Available Tags</h2>
        `

        this.innerHTML += `<ul>`

        const namespace = this.getAttribute('name')
        for(let key in this.response) {
            this.innerHTML += `<li>${namespace}-${key}</li>`
        }

        
        this.innerHTML += `<ul>`
    }
}
