class Form extends Page {
    constructor(domTarget, dataManager) {
        super(domTarget, dataManager)
        this.render();
        this.checkForm();
    }
    // Formulaire de validation de commande
    render() {

        this.DOM.innerHTML = `
        <formulaire class= "form_list">
            <label for="lastname">Nom :</label>
            <input type="text" placeholder="Nom" id="lastname" name="user_lastname" class="input_form" required="required" maxlength="20">
        
            <label for="firstname">Prénom :</label>
            <input type="text" placeholder="Prenom" id="firstname" name="user_firstname" class="input_form" required maxlength="20">

            <label for="adress">Adresse :</label>
            <input type="text" placeholder="Adresse de livraison" id="adress" name="user_adress" class="input_form" required>

            <label for="city">Ville :</label>
            <input type="text" placeholder="Ville" id="city" name="user_city" class="input_form" required>

            <label for="mail">E-Mail :</label>
            <input type="email" placeholder="Adresse mail" id="mail" name="user_mail" class="input_form" required>

            <button type="submit" class="btn_command" id="submit_btn" onclick="page.validateForm();">Commander</button>
        </formulaire>
        `
    }

    // Fonction qui permet de faire l'envoie des données au back à la validation de commande
    async validateForm() {

        let productsBought = JSON.parse(localStorage.getItem('productsId'));
        console.log(productsBought);
        const firstName = document.getElementById('firstname');
        const lastName = document.getElementById('lastname');
        const address = document.getElementById('adress');
        const city = document.getElementById('city');
        const mail = document.getElementById('mail');
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
        
        const data = await this.dataManager.sendOrder(order);
        localStorage.setItem("orderId", data.orderId);
        // localStorage.setItem("total", priceConfirmation);
        console.log(data);
        cart.refresh();
        window.changePage("confirmation");
    }

    checkForm() {
        const firstName = document.getElementById('firstname');
        const lastName = document.getElementById('lastname');
        const address = document.getElementById('adress');
        const city = document.getElementById('city');
        const mail = document.getElementById('mail');
        
    }
}