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
     *  States of the container
     * 
     */
    const STATES = ['centered', 'dark', 'rounded'];
    /**
     * 
     *  Define element
     * 
     */
    customElements.define('nes-container', class extends HTMLElement{
        static get observedAttributes() {
            return ['label',  ...STATES];
        }

        constructor(){
            super();
            /**
             * 
             *  Create shadow root
             * 
             */
            let shadow = this.attachShadow({mode: 'open'});
            
            /**
             * 
             *  Check for attributes
             * 
             */
            let hasTitle = this.hasAttribute('label');
            let titleValue = hasTitle ? this.getAttribute('label') : '';

            let isCentered = this.hasAttribute('centered'),
                isDark = this.hasAttribute('dark'),
                isRounded = this.hasAttribute('rounded');
            /**
             * 
             *  Create the wrapper
             * 
             */
            let wrapper = document.createElement('div');
            /**
             * 
             *  Attach attributes
             * 
             */
            wrapper.setAttribute('class', 'nes-container with-title'
                + (isCentered ? ' is-centered' : '')
                + (isDark ? ' is-dark' : '')
                + (isRounded ? ' is-rounded' : ''));
            /**
             * 
             *  Attach title node
             * 
             */
            let header = document.createElement('h2');
            header.setAttribute('class', 'title');
            header.appendChild(document.createTextNode(titleValue));
            wrapper.appendChild(header);



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

            wrapper.innerHTML += this.innerHTML;
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
             *  Evaluate attribute
             * 
             */
            switch(name){
                case 'title':
                    this.shadowRoot.querySelector('h2').innerHTML = newValue;
                    break;
                default:
                    let base = 'nes-container with-title';

                    for(let states of STATES){
                        if(this.hasAttribute(states)){
                            base += ' is-' + states;
                        }
                    }
                    this.shadowRoot.querySelector('div').setAttribute('class', base);
                    break;
            }
        }
    });
}