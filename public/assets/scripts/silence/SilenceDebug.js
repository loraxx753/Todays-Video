import { Silence } from './Silence.js'


export class SilenceDebug extends Silence {
    constructor() {
        super();
    }

    async connectedCallback() {
        let api_name = this.tagName.toLowerCase().split('-').shift()
        const json = JSON.parse(localStorage.getItem(`silence-${api_name}`)).response
        let output = json

        if(this.getAttribute('key')) {
            output = json[this.getAttribute('key')]
            api_name += `.</span><span color="purple">${this.getAttribute('key')}`
        }

        this.innerHTML = `
        <details>
            <summary>Silence Debugger (<span color="blue">${api_name}</span>)</summary>
            <pre><code>${JSON.stringify(output, null, 2)}</code></pre>
        </details>`

    }
}
