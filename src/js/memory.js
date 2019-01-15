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

/**
 * 
 *  Memory Pair
 * 
 *  Memory Pair monitors the parity of the DOM counterparts
 *  between the element's Light DOM and Shadow DOM. This way,
 *  if JS modifies an element dynamically to the Light DOM,
 *  the host can automatically apply the changes quickly to
 *  it's DOM counterpart by the use of Memory Pair
 * 
 * 
 */

class MemoryPair{
    constructor(){
        /**
         * 
         *  Monitors the element's integrity
         * 
         */
        this.map = new WeakMap();

        this.leftReference = [];
        this.rightReference = [];
        /**
         * 
         *  Generates an ID that distinguishes element pairs
         * 
         */
        this.recycler = [1];
    }

    getElement(node){
        return this.leftReference[node] || this.rightReference[node];
    }

    hasElement(el){
        return this.map.has(el);
    }

    getElementID(el){
        return hasElement(el) && this.map.get(el);
    }

    getPair(el){
        if(hasElement(el)){
            let node = getElementID(el);

            let left = leftReference[node];
            let right = rightReference[node];

            if(left === el){
                return right;
            } else {
                return left;
            }
        }
        return undefined;
    }

    validate(el1, el2){
        if(hasElement(el1) && hasElement(el2)){
            return getElementID(el1) === getElementID(el2)
        }
        return false;
    }

    unpair(el1, el2){
        if(validate(el1, el2)){
            let node = getElementID(el1);

            
        }
    }

    pair(el1, el2){
        /**
         * 
         *  Check if the element is already in the memory
         * 
         */
        let checkEl1 = hasElement(el1);
        let checkEl2 = hasElement(el2);
        let node = this.recycler[0];

        let nextNode = this.recycler[node];

        if(!nextNode){
            this.recycler[0] = node + 1;
        } else {
            this.recycler[0] = nextNode;
        }

        this.recycler[node] = -1;

        this.map.set(el1, node);
        this.map.get(el2, node);

        this.leftReference[node] = el1;
        this.rightReference[node] = el2;
    }
}