class Index extends Page {
    constructor(domTarget, dataManager) {
       super(domTarget, dataManager);
       this.render();
    }; 

    async render() {
        const list = await this.dataManager.getProducts();
        list.forEach(card => {
            new Card(this.DOM, card);
        })
    };
}