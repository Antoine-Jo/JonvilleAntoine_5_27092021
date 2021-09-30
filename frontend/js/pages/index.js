class Index {
    constructor(domTarget, dataManager) {
       this.DOM = domTarget;
       this.dataManager = dataManager;
       this.render();
    }; 

    async render() {
        const list = await this.dataManager.getProducts();
        list.forEach(card => {
            new Card(this.DOM, card);
        })
    };
}

class Product extends Index {
    async render() {
        await this.dataManager.getProduct();
        new Card(this.DOM, this.dataManager);
        
    }
}