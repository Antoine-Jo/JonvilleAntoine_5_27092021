class Panier extends Page {
    constructor(domTarget) {
        super(domTarget, null);
        this.render();
    };

    render() {
        this.DOM.innerHTML = `
            <h2>Je suis le panier !</h2>
        `

    }
}