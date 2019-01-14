{
    const ATTRIBUTES = [
        'autofocus', 'disabled', 'form', 'formaction', 
        'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
        'name', 'type', 'value'
    ];

    const STATES = ['primary', 'success', 'warning', 'error', 'disabled'];

    class NESButton extends HTMLElement{
        static get observedAttributes() {
            return ['state', 'autofocus', 'disabled', 'form', 'formaction', 
            'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
            'name', 'type', 'value'];
        }

        constructor(){
            super();

            let shadow = this.attachShadow({mode: 'open'});

            let flags = {}, values = {};

            for(let attrb of ATTRIBUTES){
                let flag = this.hasAttribute(attrb);
                flags[attrb] = flag;
                values[attrb] = flag ? this.getAttribute(attrb) : '';
            }

            let button = document.createElement('button');

            let hasState = this.hasAttribute('state');

            let state = hasState ? this.getAttribute('state') : '';

            let styling = 'nes-btn';
            if(hasState && STATES.includes(state)){
                styling += ' is-' + state;
            }

            button.setAttribute('class', styling);

            for(let attrb of ATTRIBUTES){
                if(flags[attrb]){
                    button.setAttribute(attrb, values[attrb]);
                }
            }
            button.appendChild(document.createTextNode(this.innerHTML));
            /**
             * 
             * Finalize
             * 
             */
            let style = document.createElement('style');

            style.textContent = `
                @import url("https://fonts.googleapis.com/css?family=Press+Start+2P");
                @import url("https://unpkg.com/nes.css/css/nes.min.css");

                .nes-field > label{
                    font-family: "Press Start 2P";
                }
            `;
            
            shadow.appendChild(style);
            shadow.appendChild(button);
        }

        connectedCallback(){

        }
        disconnectedCallback(){

        }
        adoptedCallback(){

        }
        attributeChangedCallback(name, oldValue, newValue){
            /**
             * 
             * Check if the attribute to be changed must be applied to the input element
             * 
             */
            if(ATTRIBUTES.includes(name)){
                if(this.hasAttribute(name)){
                    this.shadowRoot.querySelector('button').setAttribute(name, newValue);
                } else {
                    this.shadowRoot.querySelector('button').removeAttribute(name);
                }
            } else {
                /**
                 * 
                 *  The attribute targets the style, change according to element.
                 * 
                 */
                
                let styling = 'nes-btn';
                if(this.hasAttribute('state') && STATES.includes(newValue)){
                    styling += ' is-' + newValue;
                }

                this.shadowRoot.querySelector('button').setAttribute('class', styling);
            }
        }
    }

    customElements.define('nes-button', NESButton);
}