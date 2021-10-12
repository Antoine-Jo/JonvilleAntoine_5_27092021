class Product extends Page {
  constructor(domTarget, dataManager, idProduct) {
    super(domTarget, dataManager);
    this.productId = idProduct;
    this.render();
  }

  async render() {
    try{
      const product = await this.dataManager.getProduct(this.productId);
      // console.log(product, this.productId)
      this.DOM.innerHTML = this.makeHtml(product);
    new Card(this.DOM, product);
    }
    catch(err){
      console.error(err);
      window.changePage(404);
    }
  }

  /**
   * génère la fiche produit
   *
   * @param   {FicheProduit}  props  [props description]
   *
   * @return  {String}               le contenu html de la page
   */
  makeHtml(props){
    return `
    <img src="${props.imageUrl}" alt="Photo de l'ours en peluche" class="product_img">
    <h2 class="product_title">${props.name}</h2>
    <p class="product_content">${props.description}</p>
    <span class="product_price">${props.price / 100 + ".00 €"}</span>`;
  }
  
}
