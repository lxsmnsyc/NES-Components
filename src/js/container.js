

{
    class NESContainer extends HTMLElement{
        static get observedAttributes() {
            return ['title', 'is-centered', 'is-dark', 'is-rounded'];
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
            let hasTitle = this.hasAttribute('title');
            let titleValue = hasTitle ? this.getAttribute('title') : '';

            let isCentered = this.hasAttribute('is-centered'),
                isDark = this.hasAttribute('is-dark'),
                isRounded = this.hasAttribute('is-rounded');
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
            switch(name){
                case 'title':
                    this.shadowRoot.querySelector('h2').innerHTML = newValue;
                    break;
                default:
                    this.shadowRoot.querySelector('div').setAttribute('class', 'nes-container with-title'
                    + (this.hasAttribute('is-centered') ? ' is-centered' : '')
                    + (this.hasAttribute('is-dark') ? ' is-dark' : '')
                    + (this.hasAttribute('is-rounded') ? ' is-rounded' : ''));
                    break;
            }
        }
    }

    /**
     * 
     *  Define custom element
     * 
     */
    customElements.define('nes-container', NESContainer);
}