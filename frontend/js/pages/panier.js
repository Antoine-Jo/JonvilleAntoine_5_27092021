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

                this.DOM.innerHTML += `
                <article class="product_line">
                    <h2>${product.name}</h2>
                    <p>${product.colors}</p>
                    <span>${product.price / 100 + ".00 €"}</span>
                </article>
                `
            }
        }
        // Formulaire validation commande
        this.DOM.innerHTML += `
        <div class="form_line">
            <label for="lastname">Nom :</label>
            <input type="text" placeholder="Nom" id="lastname" name="user_lastname" required maxlength="20">
            <span id="missing_name"></span>
        </div>
        `
    }
}
                
                