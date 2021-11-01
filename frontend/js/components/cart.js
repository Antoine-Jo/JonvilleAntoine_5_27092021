class Cart{
    constructor(domTarget){
        this.DOM = document.createElement("i");
        this.DOM.className = "fas fa-shopping-cart header_icon";
        domTarget.appendChild(this.DOM);
        window.cart = this;
    }

    // Fonction qui permet d'afficher l'icone Panier avec le nombre d'article déjà présent dans le panier
    refresh(){
        let qty = 0;
        const products = JSON.parse(localStorage.products);
        console.log(products);
        products.forEach(element => {
            qty += parseInt(element.quantite);
        });
        if (qty === 0) this.DOM.removeAttribute("qty");
        else this.DOM.setAttribute("qty", qty);
    }

}