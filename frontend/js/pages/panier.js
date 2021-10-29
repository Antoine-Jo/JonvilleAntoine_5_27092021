class Panier extends Page {
    constructor(domTarget) {
        super(domTarget);
        this.DOM = document.createElement('section');
        this.DOM.classList.add('section_product')
        domTarget.appendChild(this.DOM);
        this.render();
        this.totalPrice();
        this.deleteProduct();
    }


    render() {
        // Variable qui récupère le contenu du LS
        const allProducts = JSON.parse(localStorage.getItem("products"));
        //console.log(allProducts); // Vérifie qu'on a bien les produits enregistré dans le LS
        
        // Si le panier est vide, afficher le message
        if (allProducts === null) {
            //console.log("je suis vide !"); // Vérifie que ça fonctionne
            this.DOM.innerHTML = `
            <p class="empty_basket">Votre panier est vide, <a class="return_home" onclick="changePage('index');location.reload();">Veuillez retourner à nos produits</a></p>
            `
        } else {  //Sinon afficher les produits enregistré dans le LS
            // console.log("Je ne suis pas vide !");  // Vérifie que ça fonctionne
            for (let product of allProducts) {

                this.DOM.innerHTML += `
                <article class="product_line">
                    <h2 class="article_title">${product.name}</h2>
                    <p class="article_color">${product.colors}</p>
                    <input type="number" value=${product.quantite} class="article_quantity" aria-labelledby="quantité choisi">
                    <span class="article_price">${product.price + ".00 €"}</span>
                    <i class="fas fa-trash-alt article_delete"></i>
                </article>
                `
            }
        }
        // Formulaire validation commande
        this.DOM.innerHTML += `
        <button class="delete" onclick="page.emptyBasket()">Vider le panier</button>
        <h3 class="total_title">Total de votre commande : <span class="total_price"></span></h3>
        <button class="validate_order" onclick="page.toValidate()">Passer la commande</button>
        `
    }

    deleteProduct() {
        let btn_delete = document.querySelectorAll('.article_delete')
        // console.log(btn_delete);
        let allProducts = JSON.parse(localStorage.getItem("products"));

        for (let j = 0; j < btn_delete.length; j++) {
            btn_delete[j].addEventListener('click', (e) => {
                e.preventDefault();
                // console.log(btn_delete[j]);
                let id_product = allProducts[j]._id
                // console.log(id_product);
                allProducts = allProducts.filter(el => el._id !== id_product)
                // console.log(allProducts);
                localStorage.setItem("products", JSON.stringify(allProducts));
                location.reload();
            })
        }
    }

    totalPrice() {

        
        const allProducts = JSON.parse(localStorage.getItem("products"));
        let totalPrice = document.querySelector('.total_price')
        let totalOrder = []; // Variable qui va recevoir tout les prix du panier
        let priceTotal;
        if (allProducts !== null) {   
            for (let i = 0; i < allProducts.length; i++) {
                    
                    let total = allProducts[i].price;
                    // console.log(total);
                    //  Mettre les prix dans le tableau
                    totalOrder.push(total)
                    // console.log(totalOrder);
                    // Faire l'addition du tableau
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    priceTotal = totalOrder.reduce(reducer);
                    
                    // Afficher le résultat sur la page
                    totalPrice.innerHTML = priceTotal + " €";
                    localStorage.setItem("total", priceTotal);
                    
            }
        } else {
            totalPrice.innerHTML = "0.00 €"
        }
        
    }

    emptyBasket() {
        localStorage.clear();
        setTimeout("location.reload(true)", 0);
    }

    toValidate() {
        
        const allProducts = JSON.parse(localStorage.getItem("products"));
        let productsBought = [] // Tableau qui reçoit les données

        for (let i = 0; i < allProducts.length; i++) {
            productsBought.push(allProducts[i]._id)
            // console.log(productsBought);
        }          
        localStorage.setItem('productsId', JSON.stringify(productsBought))
        window.changePage("form")  
    }
}


                
                