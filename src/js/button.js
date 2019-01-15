/**
 * 
 *  MIT License
 * 
 *  Copyright (c) 2019 Alexis Munsayac
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 * 
 */
{
    /**
     * 
     *  Attributes to be passed on the button
     * 
     */
    const ATTRIBUTES = [
        'autofocus', 'disabled', 'form', 'formaction', 
        'formenctype', 'formmethod', 'formnovalidate', 'formtarget',
        'name', 'type', 'value'
    ];
    /**
     * 
     *  Button states (styles)
     * 
     */
    const STATES = ['primary', 'success', 'warning', 'error', 'disabled'];

    customElements.define('nes-button', class extends HTMLElement{
        static get observedAttributes() {
            return [...ATTRIBUTES];
        }

        constructor(){
            super();
            /**
             * 
             *  Create shadow dom
             * 
             */
            let shadow = this.attachShadow({mode: 'open'});
            /**
             * 
             *  Create button element
             * 
             */
            let button = document.createElement('button');
            /**
             * 
             *  Check if the button has a state
             * 
             */
            let hasState = this.hasAttribute('state');
            /**
             * 
             *  Get the current state
             * 
             */
            let state = hasState ? this.getAttribute('state') : '';
            /**
             * 
             *  Apply the corresponding style
             * 
             */
            let styling = 'nes-btn';
            if(hasState && STATES.includes(state)){
                styling += ' is-' + state;
            }
            /**
             * 
             *  set the class
             * 
             */
            button.setAttribute('class', styling);
            /**
             * 
             *  Clone attributes from the host
             * 
             */
            for(let attrb of ATTRIBUTES){
                if(this.hasAttribute(attrb)){
                    button.setAttribute(attrb, this.getAttribute(attrb));
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
            /**
             * 
             *  Build shadow
             * 
             */
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
                if(newValue !== null){
                    this.shadowRoot.querySelector('button').setAttribute(name, newValue);
                } else {
                    this.shadowRoot.querySelector('button').removeAttribute(name);
                }
                if(name == 'value'){
                    this.shadowRoot.querySelector('button').value = newValue;
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
    });
}