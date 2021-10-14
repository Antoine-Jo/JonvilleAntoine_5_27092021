/**
 * @typedef {import('../typedef.js').FicheProduit} FicheProduit
 */

class Card {

    _id;
    name;
    price;
    imageUrl;
    description;
    colors;

    /**
     * 
     * @param {HTMLElement} domTarget 
     * @param {FicheProduit} props 
     */
    constructor(domTarget, props){
        this.DOM = document.createElement('article');
        this.DOM.classList.add('product')
        domTarget.appendChild(this.DOM);
        for (const [key, value] of Object.entries(props)) {
            this[key] = value;
        }
        this.DOM.onclick= ()=> {
            window.changePage("product", this._id);
            
        }
        this.render();
    }
    render() {
        this.DOM.innerHTML = `
            <img src="${this.imageUrl}" alt="Photo de l'ours en peluche" class="product_img">
            <h2 class="product_title">${this.name}</h2>
            <p class="product_content">${this.description}</p>
            <span class="product_price">${this.price / 100 + ".00 €"}</span>
            
        
        `
    }

    }
        