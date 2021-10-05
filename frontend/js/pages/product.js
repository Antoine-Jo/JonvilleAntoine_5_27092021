class Product extends Page {
  constructor(domTarget, dataManager, idProduct) {
    super(domTarget, dataManager);
    this.productId = idProduct;
    this.render();
  }

  async render() {
    const product = await this.dataManager.getProduct(this.productId);
      // console.log(product, this.productId)
    new Card(this.DOM, product);
  }
}
