{
    const ATTRIBUTES = [
        
    ];

    const NES_ATTRIBUTES = [
        'icon', 'size', 'transparent', 'empty'
    ];

    const SIZES = [
        'small', 'medium', 'large'
    ];

    const ICONS = [
        'heart', 'star', 'like',
        'twitter', 'facebook', 'github', 'youtube',
        'google', 'medium', 'twitch', 'reddit',
        'whatsapp', 'gmail', 'linkedin',
        'close', 'trophy'
    ];

    const EXTENDED = [
        
    ];

    customElements.define('nes-progress', class extends HTMLElement{
        static get observedAttributes(){
            return [...ATTRIBUTES, ...NES_ATTRIBUTES];
        }

        constructor(){
            super();

            let shadow = this.attachShadow({mode: 'open'});

            let progress = document.createElement('progress');

            for(let attrb of ATTRIBUTES){
                if(this.hasAttribute(attrb)){
                    progress.setAttribute(attrb, this.getAttribute(attrb));
                }
            }

            let base = 'nes-progress';

            if(this.hasAttribute('state')){
                let state = this.getAttribute('state');
                base += (STATES.includes(state) ? ' is-' + state : '');
            }

            progress.setAttribute('class', base);

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
            shadow.appendChild(progress);
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
                    this.shadowRoot.querySelector('progress').removeAttribute(name);
                } else {
                    this.shadowRoot.querySelector('progress').setAttribute(name, newValue);
                }
            } else {
                let base = 'nes-progress';

                if(this.hasAttribute('state')){
                    let state = this.getAttribute('state');
                    base += (STATES.includes(state) ? ' is-' + state : '');
                }

                this.shadowRoot.querySelector('progress').setAttribute('class', base);
            }
        }
    });
}