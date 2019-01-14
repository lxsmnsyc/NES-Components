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
     * Input main attributes
     * 
     */
    const MAIN_ATTRIBUTES = ['autocomplete', 'autofocus', 'disabled', 'form', 'list', 'name', 'readonly', 'required', 'tabindex', 'type', 'value'];
    /**
     * 
     * Materialize specific attributes
     * 
     */
    const NES_ATTRIBUTES = ['label', 'state', 'inline'];
    /**
     * 
     * Input type-specific attributes
     * 
     */
    const INPUT_ATTRIBUTES = {
        'date': ['max', 'min', 'step', 'pattern'],
        'datetime-local': ['max', 'min', 'step', 'pattern'],
        'email' : ['placeholder', 'maxLength', 'minLength', 'pattern', 'size', 'spellcheck', 'multiple'],
        'month': ['max', 'min', 'step'],
        'password': ['placeholder', 'maxLength', 'minLength', 'pattern', 'size'],
        'number': ['placeholder', 'max', 'min', 'step'],
        'search': ['placeholder', 'maxLength', 'minLength', 'pattern', 'size', 'spellcheck'],
        'tel': ['placeholder', 'maxLength', 'minLength', 'pattern', 'size'],
        'text': ['placeholder', 'maxLength', 'minLength', 'pattern', 'size', 'spellcheck'],
        'time': ['max', 'min', 'step'],
        'url': ['placeholder', 'maxLength', 'minLength', 'pattern', 'size', 'spellcheck'],
        'week': ['max', 'min', 'step'],
    };

    const STATES = ['success', 'warning', 'error'];
    class NESInputBox extends HTMLElement{
        static get observedAttributes() {
            return [
                /**
                 * 
                 * Input main attributes
                 * 
                 */
                'autocomplete', 'autofocus', 'disabled', 'form', 'list', 'name', 'readonly', 'required', 'tabindex', 'type', 'value',
                /**
                 * 
                 * Input type-specific attributes
                 * 
                 */
                'placeholder', 'maxLength', 'minLength', 'pattern', 'size', 'spellcheck', 'multiple',
                'max', 'min', 'step',
                /**
                 * 
                 * NES
                 * 
                 */
                'label', 'state'
            ];
        }
        /**
         * 
         *  Getters and setters
         * 
         */
        get value(){
            return this.querySelector('input').value;
        }

        set value(input){
            this.querySelector('input').value = input;
        }

        get disabled(){
            return this.hasAttribute('disabled');
        }

        set disabled(flag){
            if(flag){
                this.setAttribute('disabled', '');
                this.querySelector('input').setAttribute('disabled', '');
            } else {
                this.removeAttribute('disabled');
                this.querySelector('input').removeAttribute('disabled');
            }
        }
        
        constructor(){
            super();

            let shadow = this.attachShadow({mode: 'open'});

            /**
             * 
             *  Material Input Box attributes
             * 
             */
            let flags = {},
                values = {};
            for(let attrb of NES_ATTRIBUTES){
                let flag = this.hasAttribute(attrb);
                flags[attrb] = flag;
                values[attrb] = flag ? this.getAttribute(attrb) : '';
            }
            /**
             * 
             *  Create material input box container
             * 
             */
            let wrapper = document.createElement('div');
            /**
             * 
             *  attach grid type 
             * 
             */
            wrapper.setAttribute('class', 'nes-field' + (flags.inline ? ' is-inline' : ''));
            
            /**
             * 
             *  Input label
             * 
             */
            let label = document.createElement('label');
            label.appendChild(document.createTextNode(flags.label ? values.label : ''));
            wrapper.appendChild(label);
            /**
             * 
             *  Input Element
             * 
             */
            let input = document.createElement('input');

            let styling = 'nes-input';
            if(flags.state){
                let state = values.state
                switch(state){
                    case 'success': case 'warning': case 'error':
                        styling += ' is-' + state;
                        break;
                    default:
                        break;
                }

            }
            input.setAttribute('class', styling);

            let inputType = this.hasAttribute('type') ? this.getAttribute('type') : 'text';
            input.setAttribute('type', inputType);
            if(flags['character-count']){
                input.setAttribute('data-length', values['character-count']);
            }
            /**
             * 
             *  Attach attributes to the input element
             * 
             */
            for(let attrb of MAIN_ATTRIBUTES){
                if(this.hasAttribute(attrb)){
                    input.setAttribute(attrb, this.getAttribute(attrb));
                }
            }
            /**
             * 
             *  Attach type-specific attributes
             * 
             */
            for(let attrb of INPUT_ATTRIBUTES[inputType]){
                if(this.hasAttribute(attrb)){
                    input.setAttribute(attrb, this.getAttribute(attrb));
                }
            }

            wrapper.appendChild(input);

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
             * Check if the attribute to be changed must be applied to the input element
             * 
             */
            if(MAIN_ATTRIBUTES.includes(name)){
                if(this.hasAttribute(name)){
                    this.shadowRoot.querySelector('input').setAttribute(name, newValue);
                } else {
                    this.shadowRoot.querySelector('input').removeAttribute(name);
                }
            } else {
                /**
                 * 
                 *  Check if the attribute is a member attribute for type-specific inputs
                 * 
                 */
                for(let index of Object.entries(INPUT_ATTRIBUTES)){
                    if(index.includes(name)){
                        this.shadowRoot.querySelector('input').setAttribute(name, newValue);
                        return;
                    }
                }
            }
            /**
             * 
             *  The attribute targets the style, change according to element.
             * 
             */
            switch(name){
                case 'label':
                    this.shadowRoot.querySelector('label').innerHTML = newValue;
                    break;
                case 'state':
                    styling = 'nes-input' + (STATES.includes(newValue) ? ' is-' + newValue : '');
                    
                    this.shadowRoot.querySelector('.nes-input').setAttribute('class', styling);
                    break; 
                case 'inline':
                    styling = 'nes-field' + (this.hasAttribute('inline') ? ' is-inline' : '');
                    this.shadowRoot.querySelector('.nes-field').setAttribute('class', styling);
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 
     *  Define custom element
     * 
     */
    customElements.define('nes-input', NESInputBox);
}
