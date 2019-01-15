{
    const ATTRIBUTES = [
        'src', 'alt', 'crossorigin', 'decoding',
        'height', 'ismap', 'sizes', 'srcset', 
        'width', 'longdesc'
    ];

    const NES_ATTRIBUTES = [
        'size', 'rounded'
    ];

    const SIZES = [
        'small', 'medium', 'large'
    ];

    customElements.define('nes-avatar', class extends HTMLElement{
        static get observedAttributes(){
            return [...ATTRIBUTES, ...NES_ATTRIBUTES];
        }

        constructor(){
            super();

            let shadow = this.attachShadow({mode: 'open'});

            let img = document.createElement('img');

            for(let attrb of ATTRIBUTES){
                if(this.hasAttribute(attrb)){
                    img.setAttribute(attrb, this.getAttribute(attrb));
                }
            }

            let base = 'nes-avatar';

            base += (this.hasAttribute('rounded') ? ' is-rounded' : '');

            if(this.hasAttribute('size')){
                let size = this.getAttribute('size');
                base += (SIZES.includes(size) ? ' is-' + size : '');
            }

            img.setAttribute('class', base);

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

            shadow.appendChild(style);
            shadow.appendChild(img);
        }

        connectedCallback(){

        }

        disconnectedCallback(){

        }

        adoptedCallback(){

        }

        attributeChangedCallback(name, oldValue, newValue){
            if(ATTRIBUTES.includes(name)){
                /**
                 * 
                 *  Apply the change
                 * 
                 */
                
                if(newValue === null){
                    this.shadowRoot.querySelector('img').removeAttribute(name);
                } else {
                    this.shadowRoot.querySelector('img').setAttribute(name, newValue);
                }
            } else {
                let base = 'nes-avatar';
                base += (this.hasAttribute('rounded') ? ' is-rounded' : '');

                if(this.hasAttribute('size')){
                    let size = this.getAttribute('size');
                    base += (SIZES.includes(size) ? ' is-' + size : '');
                }

                this.shadowRoot.querySelector('img').setAttribute('class', base);
            }
        }
    });
}