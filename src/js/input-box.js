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
     *  Input main attributes
     * 
     */
    const MAIN_ATTRIBUTES = [
        'autocomplete', 'autofocus', 'disabled', 'form', 
        'list', 'name', 'readonly', 'required', 
        'tabindex', 'type', 'value'
    ];
    /**
     * 
     *  Materialize specific attributes
     * 
     */
    const NES_ATTRIBUTES = ['title', 'state', 'inline'];
    /**
     * 
     *  Input type-specific attributes
     * 
     */
    const INPUT_ATTRIBUTES = [
        'placeholder', 'maxLength', 'minLength', 'pattern', 
        'size', 'spellcheck', 'multiple', 'max', 
        'min', 'step'
    ];
    /**
     * 
     *  Allowed input types
     * 
     */
    const INPUT_TYPES = [
        'text', 'password', 'email', 'number', 
        'date', 'datetime-local', 'week', 'month', 
        'time', 'tel', 'url', 'search'
    ];
    /**
     * 
     *  Input States
     * 
     */
    const STATES = ['success', 'warning', 'error'];
    /**
     * 
     *  Attributes for the input
     * 
     */
    const ATTRIBUTES = [...MAIN_ATTRIBUTES, ...INPUT_ATTRIBUTES];
    /**
     * 
     *  Event types
     * 
     */
    const INPUT_EVENT_TYPES = [
        'beforeinput', 'blur', 'focus', 'focusin', 
        'focusout', 'input'
    ];
    /**
     * 
     *  Define custom element
     * 
     */
    customElements.define('nes-input', class extends HTMLElement{
        static get observedAttributes(){
            return [
                ...MAIN_ATTRIBUTES, ...NES_ATTRIBUTES, ...INPUT_ATTRIBUTES
            ];
        }

        constructor(){
            super();
            /**
             * 
             *  Get shadow dom
             * 
             */
            let shadow = this.attachShadow({mode: 'open'});

            /**
             * 
             *  Create the wrapper element
             * 
             */
            let wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'nes-field' + (this.hasAttribute('inline') ? ' is-inline' : ''));
            /**
             * 
             *  Create the label element
             * 
             */
            let label = document.createElement('label');
            label.appendChild(document.createTextNode(this.hasAttribute('title') ? this.getAttribute('title') : ''));
            /**
             * 
             *  Create the input element
             * 
             */
            let input = document.createElement('input');
            /**
             * 
             *  Copy parent attributes to input 
             *
             */
            for(let attrb of ATTRIBUTES){
                if(this.hasAttribute(attrb)){
                    input.setAttribute(attrb, this.getAttribute(attrb));
                }
            }
            /**
             * 
             *  Make sure that the input type is an allowed type.
             * 
             */
            let defaultValue = this.getAttribute('type');
            if(!INPUT_TYPES.includes(defaultValue)){
                defaultValue = 'text';  
            }
            input.setAttribute('type', defaultValue);
            /**
             * 
             *  Apply classes to input
             * 
             */
            let base = 'nes-input';
            if(this.hasAttribute('state')){
                let state = this.getAttribute('state');
                base +=  (STATES.includes(state) ? ' is-' + state : '');
            }
            input.setAttribute('class', base);
            /**
             * 
             *  Create a listener that automatically adjusts
             *  the element's value attribute whenever the 
             *  input's value changes.
             * 
             */
            input.addEventListener('change', e => { 
                this.setAttribute('value', input.value);
            });
            /**
             * 
             *  Import styling
             * 
             */
            let styling = `
                @import url("https://unpkg.com/nes.css/css/nes.min.css"); 
                @import url("https://fonts.googleapis.com/css?family=Press+Start+2P");

                .nes-field > label, .nes-field > input{
                    font-family: "Press Start 2P";
                }
            `
            let style = document.createElement('style');
            style.textContent = styling;

            /**
             * 
             *  Build DOM Tree
             * 
             */
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            shadow.appendChild(style);
            shadow.appendChild(wrapper);
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
             *  Check if the modified attribute is a valid attribute
             *  for the input element
             * 
             */
            if(ATTRIBUTES.includes(name)){
                /**
                 * 
                 *  Apply the change
                 * 
                 */
                
                if(newValue === null){
                    this.shadowRoot.querySelector('input').removeAttribute(name);
                } else {
                    this.shadowRoot.querySelector('input').setAttribute(name, newValue);
                }

                if(name == 'value'){
                    this.shadowRoot.querySelector('input').value = newValue;
                }

            } else if(NES_ATTRIBUTES.includes(name)){
                /**
                 * 
                 *  Iterate attributes through switch
                 * 
                 */
                switch(name){
                    case 'inline':
                        this.shadowRoot.querySelector('.nes-field').setAttribute('class', 'nes-field' + (newValue === null ? '' : ' is-inline'));
                        break;
                    case 'state':
                        let state = newValue !== null ? newValue : '';
                        this.shadowRoot.querySelector('.nes-input').setAttribute('class', 'nes-input' +  (STATES.includes(state) ? ' is-' + state : ''));
                        break;
                    case 'title':
                        this.shadowRoot.querySelector('label').innerHTML = newValue;
                        break;
                    default:
                        break;
                }
            }
        }
    });
}
