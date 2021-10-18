class Product extends Page {
  constructor(domTarget, dataManager, idProduct) {
    super(domTarget, dataManager);
    this.productId = idProduct;
    this.render();
    // this.addBasket();
  }

  async render() {
    try {
      const product = await this.dataManager.getProduct(this.productId);
        // console.log(product, this.productId)
        
        this.DOM.innerHTML = this.renderProduct(product)
      // new Card(this.DOM, product);
    }
    catch(err) {
      console.error(err);
      window.changePage(404);
    }
  }

  /**
 * génère la fiche produit
 * 
 * @param {FicheProduit} props    [props description]
 * 
 * @return {String}          le contenu html de la page
 */
  
  renderProduct(props) {

    const options = props.colors;
    // console.log(options);

    let colors = [];
    
    for(let i = 0; i < options.length; i++) {

      let opt = options[i]
      colors = colors +
      `
      <option value='${opt}'>${options[i]}</option>
      `
    }
    console.log(colors);  
    let btnAdd = document.createElement('button');
    btnAdd = `
      <button type="submit" class="btn_add">Ajouter au panier</button>
    `  
    
    return this.DOM.innerHTML = `
    <article class="product">
    <img src="${props.imageUrl}" alt="Photo de l'ours en peluche" class="product_img">
    <h2 class="product_title">${props.name}</h2>
    <p class="product_content">${props.description}</p>
    <span class="product_price">${props.price / 100 + ".00 €"}</span>
    <select>
      <option>Choisissez une couleur${colors}</option> 
    </select>
    ${btnAdd}
    </article>
    `
  }

}
      
    
    


  
  
