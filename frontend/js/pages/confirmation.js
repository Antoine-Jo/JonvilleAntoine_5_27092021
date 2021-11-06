class Confirmation extends Page {
    constructor(domTarget) {
        super(domTarget, null)
        this.render();
    }

    // Affichage de la confirmation de commande avec son prix total et son numéro de commande
    render() {
        
        this.DOM.innerHTML = `
        <div class="display_confirm">
            <h2>Votre commande a bien été prise en compte</h2>
            <p>Le montant total est de <span>${localStorage.getItem('total')} .00 €</span></p>
            <p>Votre numero de commande est : <span>${localStorage.getItem('orderId')}</span></p>
            <button class="btn_confirm" onclick="changePage('index');location.reload()">Confirmer</button>
        </div>
        `;
        // localStorage.clear();
    }

}