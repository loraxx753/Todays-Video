export class SilenceChildElement extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
    }

    static get observedAttributes() {
        return ['guid'];
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        if(attrName == 'guid' && newVal) this.data = JSON.parse(localStorage.getItem(`silence-${newVal}`))
        this.handleArrayData()
    }

    async handleArrayData() {
        if(this.hasAttribute('limit')) this.data = this.data.slice(0, this.getAttribute('limit'))

        this.arrayTemplate = this.firstElementChild.cloneNode(true)
        this.removeChild(this.firstElementChild)
        for(let row of this.data) {
            const template = this.arrayTemplate.cloneNode(true)
            for(let key in row) {
                const attributesFound = template.querySelectorAll(`[array-${key}]`)
                for(let element of attributesFound) {
                    element.innerHTML = row[key]
                }

                const elementsFound = template.querySelectorAll(`array-${key}`)
                for(let element of elementsFound) {
                    element.innerHTML = row[key]
                }

                const elementChildren = [ ...template.querySelectorAll(`*`) ]
                for(let element of elementChildren) {
                    const clone = element.cloneNode(true)
                    for(let attr of clone.attributes) {
                        if(`\${array-${key}}`, attr.value.includes(`\$\{array-${key}\}`)) {
                            attr.value = attr.value.replace(`\$\{array-${key}\}`, row[key])
                            element.setAttribute(attr.name, attr.value)
                        }
                    }
                    
                }
                
            }
            this.appendChild(template)
        }          
    }

}