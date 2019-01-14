
{
    /**
     * 
     * Input main attributes
     * 
     */
    const ATTRIBUTES = ['name'];
    const CHILD_OBSERVABLE_ATTRIBUTES = ['autocomplete', 'autofocus', 'disabled', 'form', 'list', 'readonly', 'required', 'tabindex', 'value'];
    
    
    
    class NESRadio extends HTMLElement{
        static get observedAttributes() {
            return ['name'];
        }

        constructor(){
            super();

            let shadow = this.attachShadow({mode: 'open'});

            let radioGroup = this.hasAttribute('name') ? this.getAttribute('name') : '';

            let options = this.querySelectorAll('option');

            let container = document.createElement('div');
            /**
             * 
             *  Render options 
             * 
             */
            for(let option of options){
                /**
                 * 
                 *  Get the child option
                 * 
                 */
                let radioValue = option.hasAttribute('value') ? option.getAttribute('value') : '';
                let labelValue = option.innerHTML;
                /**
                 * 
                 *  Create a wrapper
                 * 
                 */
                let wrapper = document.createElement('label');
                /**
                 * 
                 *  Create a radio element
                 * 
                 */
                let radio = document.createElement('input');
                radio.setAttribute('type', 'radio');
                radio.setAttribute('class', 'nes-radio');
                radio.setAttribute('value', radioValue);
                radio.setAttribute('name', radioGroup);
                /**
                 * 
                 *  Create a label
                 * 
                 */
                let label = document.createElement('span');
                label.appendChild(document.createTextNode(labelValue));

                /**
                 * 
                 *  Append wrapper
                 * 
                 */
                wrapper.appendChild(radio);
                wrapper.appendChild(label);
                
                container.appendChild(wrapper);
            }

            /**
             * 
             *  Observe changes in options
             * 
             */

            let observer = new MutationObserver(mutations => {
                /**
                 * 
                 *  Check mutations
                 * 
                 */
                for(let mutation of mutations){
                    /**
                     * 
                     *  Get target node
                     * 
                     */
                    let targetNode = mutation.target;
                    /**
                     * 
                     *  Get mutation type  
                     * 
                     */
                    let mutationType = mutation.type;
                    /**
                     * 
                     *  Iterate mutation types
                     * 
                     */
                    switch(mutationType){
                        /**
                         * 
                         *  Attribute changed on the element
                         * 
                         */
                        case 'attributes':
                            /**
                             * 
                             *  Attribute changes are already handled by the attributeChangeCallback
                             *  except if the target node is not the element itself 
                             * 
                             */
                            if(targetNode !== this){
                                /**
                                 * 
                                 *  Modify element according to it's paired input 
                                 * 
                                 */
                                let shadowList = this.shadowRoot.lastChild.firstChild;
                                let inputList = this.firstChild;
                                /**
                                 * 
                                 *  Get target attribute mutation
                                 * 
                                 */
                                let attributeName = mutation.attributeName;
                                /**
                                 * 
                                 *  We don't want them overwriting reserved attributes
                                 *  like class, name and type
                                 * 
                                 */
                                if(CHILD_OBSERVABLE_ATTRIBUTES.includes(attributeName)){
                                    /**
                                     * 
                                     *  Find target node
                                     * 
                                     */
                                    while(shadowList){
                                        if(inputList === targetNode){
                                            /**
                                             * 
                                             *  Modify attribute
                                             * 
                                             */
                                            shadowList.querySelector('input').setAttribute(attributeName, inputList.getAttribute(attributeName));
                                            break;
                                        }
                                        shadowList = shadowList.nextSibling;
                                        inputList = inputList.nextSibling
                                    }
                                }
                            }
                            break;
                        /**
                         * 
                         *  A node has been added and/or removed from the list
                         * 
                         */
                        case 'childList':
                            /**
                             * 
                             *  Iterate removed nodes
                             * 
                             */
                            for(let removedNode of mutation.removedNodes){
                                /**
                                 * 
                                 *  Compare lists
                                 * 
                                 */
                                let shadowList = this.shadowRoot.firstChild;
                                let inputList = this.firstChild;
                                
                                while(shadowList){
                                    /**
                                     * 
                                     *  Check if the removed node corresponds to the current node
                                     *
                                     */
                                    if(removedNode.nextSibling == inputList && removedNode.previousSibling == inputList.previousSibling){
                                        /**
                                         * 
                                         *  Remove paired node
                                         * 
                                         */
                                        this.shadowRoot.childNodes.removeNode(shadowList);
                                        break;
                                    }

                                    shadowList = shadowList.nextSibling;
                                    inputList = inputList.nextSibling;
                                }
                            }
                            /**
                             * 
                             *  Iterate added nodes
                             * 
                             */
                            for(let addedNode of mutation.addedNodes){
                                /**
                                 * 
                                 *  Compare lists
                                 * 
                                 */
                                let shadowList = this.shadowRoot.firstChild;
                                let inputList = this.firstChild;
                                
                                while(shadowList){
                                    /**
                                     * 
                                     *  Check if the added node corresponds to the current node
                                     *
                                     */
                                    if(addedNode){
                                        
                                        break;
                                    }

                                    shadowList = shadowList.nextSibling;
                                    inputList = inputList.nextSibling;
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            });

            observer.observe(this, {
                /**
                 * 
                 *  We want to monitor the whole tree
                 * 
                 */
                subtree: true,
                /**
                 * 
                 *  Also check for attribute changes
                 * 
                 */
                attributes: true,
                /**
                 * 
                 *  And changes in the child lists
                 * 
                 */
                childList: true
            });


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
            shadow.appendChild(container);
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
            if(ATTRIBUTES.includes(name)) {
                for(let options of this.shadowRoot.querySelectorAll('input')){
                    options.setAttribute(name, newValue);
                }
            }
        }
    }

    customElements.define('nes-radio', NESRadio);
    
}