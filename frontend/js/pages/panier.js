class Panier extends Page {
    constructor(domTarget) {
        super(domTarget, null);
        this.render();
    };


     /**
 * génère la fiche produit
 * 
 * @param {FicheProduit} props    [props description]
 * 
 * @return {String}          le contenu html de la page
 */
    render(props) {
        // Variable qui récupère le contenu du LS
        let allProducts = JSON.parse(localStorage.getItem("products"));
        //console.log(allProducts); // Vérifie qu'on a bien les produits enregistré dans le LS
        
        // Si le panier est vide, afficher le message
        if (allProducts === null) {
            //console.log("je suis vide !"); // Vérifie que ça fonctionne
            this.DOM.innerHTML = `
                <p class="empty_basket">Votre panier est vide, <a class="return_home" onclick="history.go(-1);">Veuillez retourner à nos produits</a></p>
                `
        } else {  //Sinon afficher les produits enregistré dans le LS
            // console.log("Je ne suis pas vide !");  // Vérifie que ça fonctionne
            allProducts.forEach((products) => {
                products.value = allProducts
                console.log(products.name);
                this.DOM.innerHTML =
                    `<h3>${products.name}</h3>
                    <p>${products.price}</p>
                    <p>${products.colors}</p>
                    `
            })
                
                
        }
    }
}
    
                