class Index extends Page {
    constructor(domTarget, dataManager) {
       super(domTarget, dataManager);
       this.render();
    }; 

    async render() {
        this.DOM.innerHTML = `
        <p class="list_product">Nos produits disponible :</p>
        `
        const list = await this.dataManager.getProducts();
        list.forEach(card => {
            new Card(this.DOM, card);
        })
    };
}