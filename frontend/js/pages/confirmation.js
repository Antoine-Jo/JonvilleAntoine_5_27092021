class Confirmation extends Page {
    constructor(domTarget) {
        super(domTarget, null)
        this.render();
        
    }

    render() {
        
        this.DOM.innerHTML = `
        <div class="display_confirm">
            <h2>Votre commande a bien été prise en compte</h2>
            <p>Le montant total est de <span>${localStorage.getItem('total')} .00 €</span></p>
            <p>Votre numero de commande est : <span>${localStorage.getItem('orderId')}</span></p>
            <button class="btn_confirm" onclick="page.home()">Confirmer</button>
        </div>
        `
    }

    home() {
        localStorage.clear();
        window.changePage('index')
    }

}