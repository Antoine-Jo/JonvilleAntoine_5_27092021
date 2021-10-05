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
     * @param {Object} props 
     * @param {String} props._id      // "5be9c8541c9d440000665243",
       @param {String} props.name      // "Norbert",
       @param {Number} props.price      // 2900,
       @param {String} props.imageUrl      // "http://localhost:3000/images/teddy_1.jpg",
       @param {String} props.description      // "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
       @param {String} props.colors      // "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
     */
    constructor(domTarget, props){
        this.DOM = document.createElement('article');
        this.DOM.classList.add('product')
        domTarget.appendChild(this.DOM);
        for (const [key, value] of Object.entries(props)) {
            this[key] = value;
        }
        this.DOM.onclick= ()=>{
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
        