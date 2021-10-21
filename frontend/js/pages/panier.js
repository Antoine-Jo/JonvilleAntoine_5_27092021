class Panier extends Page {
    constructor(domTarget) {
        super(domTarget)
        this.DOM = document.createElement('section');
        this.DOM.classList.add('section_product')
        domTarget.appendChild(this.DOM);
        this.render();
    }


    render() {
        // Variable qui récupère le contenu du LS
        const allProducts = JSON.parse(localStorage.getItem("products"));
        //console.log(allProducts); // Vérifie qu'on a bien les produits enregistré dans le LS
        
        // Si le panier est vide, afficher le message
        if (allProducts === null) {
            //console.log("je suis vide !"); // Vérifie que ça fonctionne
            this.DOM.innerHTML = `
            <p class="empty_basket">Votre panier est vide, <a class="return_home" onclick="history.go(-1);">Veuillez retourner à nos produits</a></p>
            `
        } else {  //Sinon afficher les produits enregistré dans le LS
            // console.log("Je ne suis pas vide !");  // Vérifie que ça fonctionne
            for (let product of allProducts) {
                // product.value = allProducts
                console.log(product.name);
                this.DOM.innerHTML += `
                <article>
                    <h2>${product.name}</h2>
                    <p>${product.colors}</p>
                    <span>${product.price / 100 + ".00 €"}</span>
                </article>
                
                
                `
            }
        }
    }
}