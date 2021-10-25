class Panier extends Page {
    constructor(domTarget) {
        super(domTarget, null)
        this.DOM = document.createElement('section');
        this.DOM.classList.add('section_product')
        domTarget.appendChild(this.DOM);
        this.render();
        this.totalPrice();
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
                    <input type="number" value=${product.quantite} class="product_quantity" aria-labelledby="quantité choisi">
                    <span>${product.price + ".00 €"}</span>
                </article>
                `
            }
        }
        // Formulaire validation commande
        this.DOM.innerHTML += `
        <button class="delete" onclick="page.emptyBasket()">Vider le panier</button>
        <h3 class="total_title">Total de votre commande : <span class="total_price"></span></h3>
        <form class= "form_list">
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

            <button type="submit" class="btn_command" id="submit_btn" onclick="page.toValidate()">Commander</button>
        </form>
        `
    }

    totalPrice() {

        // if(localStorage.getItem("product") !== null) {
 
            const allProducts = JSON.parse(localStorage.getItem("products"));
            let totalPrice = document.querySelector('.total_price')
            let totalOrder = []; // Variable qui va recevoir tout les prix du panier
            let priceTotal;
            
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
        // }
    }

    emptyBasket() {
        localStorage.removeItem('products');
        setTimeout("location.reload(true)", 0);
    }

    toValidate() {
        
        
        const allProducts = JSON.parse(localStorage.getItem("products"));
        let productsBought = [] // Tableau qui reçoit les données

        for (let i = 0; i < allProducts.length; i++) {
            productsBought.push(allProducts[i]._id)
            // console.log(productsBought);
        }

        let firstName = document.getElementById('firstname');
        let lastName = document.getElementById('lastname');
        let address = document.getElementById('adress');
        let city = document.getElementById('city');
        let mail = document.getElementById('mail');
        console.log(firstName.value);
        const order = {
            contact : {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: mail.value, 
            },
            products: productsBought,
        };
        console.log(order);
        localStorage.setItem('order', JSON.stringify(order));
        
        // const options = {
        //     method: "POST",
        //     body: JSON.stringify(order),
        //     headers: { "Content-Type": "application/json" },
        // };

        // let priceConfirmation = totalPrice.innerText;
        // console.log(priceConfirmation);

        // fetch("http://localhost:3000/api/teddies/order", options)
        // .then((res) => res.json())
        // .then((data) => {
        //   localStorage.clear();
        //   console.log(data)
        //   localStorage.setItem("orderId", data.orderId);
        //   localStorage.setItem("total", priceConfirmation);
        //   window.changePage("confirmation");
        // })  
        // let priceConfirmation = totalPrice.innerHTML;
        (async () => {
            const res = await fetch('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            const data = await res.json();
            localStorage.setItem("orderId", data.orderId);
            // localStorage.setItem("total", priceConfirmation);
            console.log(data);
        })();
        window.changePage("confirmation");
            
            
    }
}


                
                