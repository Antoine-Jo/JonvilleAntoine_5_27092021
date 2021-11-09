class Form extends Page {
    constructor(domTarget, dataManager) {
        super(domTarget, dataManager)
        this.render();
        // this.checkForm();
    }
    // Formulaire de validation de commande
    render() {

        this.DOM.innerHTML = `
        <form class= "form_list" method="POST">
            <label for="lastName">Nom :</label>
            <input type="text" pattern="[a-zA-Z -]+" placeholder="Nom" id="lastName" name="user_lastname" class="input_form" required="required">
        
            <label for="firstName">Prénom :</label>
            <input type="text" placeholder="Prenom"  id="firstName" name="user_firstname" class="input_form" required maxlength="20">

            <label for="address">Adresse :</label>
            <input type="text" placeholder="Adresse de livraison"  id="address" name="user_adress" class="input_form" required>

            <label for="city">Ville :</label>
            <input type="text" placeholder="Ville"  id="city" name="user_city" class="input_form" required>

            <label for="email">E-Mail :</label>
            <input type="email" placeholder="Adresse mail"  id="email" name="user_mail" class="input_form" required>
            <button   class="btn_command disabled" id="submit_btn" onclick="page.validateForm();">Commander</button>
           
        </form>
        
        `
    }

    // Fonction qui permet de faire l'envoie des données au back à la validation de commande
    async validateForm() {
        event.preventDefault();
        event.stopPropagation();
        let valid = true;
        const contact = {};
        
        
        let productsBought = JSON.parse(localStorage.getItem('productsId'));
        const form = document.querySelector("form");
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input=>{
            if (!input.checkValidity()) valid = false ;
            contact[input.id] = input.value;

        })
        if(!valid) {
            form.setAttribute("data-msg",`Vous devez renseigner tous les champs !`);
        } else {
            
            const order = {
                contact,
                products: productsBought,
            };
            console.log(order);
            localStorage.setItem('order', JSON.stringify(order));
            
            const data = await this.dataManager.sendOrder(order);
            localStorage.setItem("orderId", data.orderId);
            // localStorage.setItem("total", priceConfirmation);
            console.log(data);
            cart.refresh
            window.changePage("confirmation");
        }
        console.log(contact);

            // const order = {
            //     contact ,
            //     products: productsBought,
            // };
            // console.log(order);
            // localStorage.setItem('order', JSON.stringify(order));
            
            // const data = await this.dataManager.sendOrder(order);
            // localStorage.setItem("orderId", data.orderId);
            // // localStorage.setItem("total", priceConfirmation);
            // console.log(data);
            // cart.refresh
            // window.changePage("confirmation");
    }

    checkForm() {
        const firstName = document.getElementById('firstname');
        const lastName = document.getElementById('lastname');
        const address = document.getElementById('adress');
        const city = document.getElementById('city');
        const mail = document.getElementById('mail');
        const button = document.querySelector('.btn_command')
        button.setAttribute('disabled', 'disabled')
        console.log(firstName);  
            if(!firstName.value) {
                this.DOM.innerHTML += `Vous devez renseigner tous les champs !`
            } else {
                button.removeAttribute("disabled");
                button.classList.remove("disabled")
            }
        
    }
}