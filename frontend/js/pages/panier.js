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
                    <input type="number" value=${product.quantite} class="product_quantity">
                    <span>${parseFloat(product.price * product.quantite) / 100 + ".00 €"}</span>
                </article>
                `
            }
        }
        // Formulaire validation commande
        this.DOM.innerHTML += `
        <button class="delete" onclick="page.emptyBasket()">Vider le panier</button>
        <h4 class="total_title">Total de votre commande : <span class="total_price"></span></h4>
        <form class= "form_list" method="POST">
            <label for="lastname">Nom :</label>
            <input type="text" placeholder="Nom" id="lastname" name="user_lastname" class="input_form" required maxlength="20">
           
            <label for="firstname">Prénom :</label>
            <input type="text" placeholder="Prenom" id="firstname" name="user_firstname" class="input_form" required maxlength="20">

            <label for="adress">Adresse :</label>
            <input type="text" placeholder="Adresse de livraison" id="adress" name="user_adress" class="input_form" required>

            <label for="city">Ville :</label>
            <input type="text" placeholder="Ville" id="city" name="user_city" class="input_form" required>

            <label for="mail">Adresse mail :</label>
            <input type="email" placeholder="Adresse mail" id="mail" name="user_mail" class="input_form" required>

            <button type="submit" class="btn_command" id="submit_btn">Commander</button>
        </form>
        `
    }

    emptyBasket() {
        localStorage.removeItem('products');
        setTimeout("location.reload(true)", 0);
    }
}
                
                