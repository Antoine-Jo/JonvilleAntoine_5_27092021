// Page d'un seul produit
class Product extends Page {
  constructor(domTarget, dataManager, idProduct) {
    super(domTarget, dataManager);
    this.productId = idProduct;
    this.render();
  }

  // Fonction affichage d'un seul produit en fonction de son ID
  async render() {
    try {
      this.product = await this.dataManager.getProduct(this.productId);
      // console.log("1...",product, this.productId)
        
        this.DOM.innerHTML = this.renderProduct(this.product)
    }
    catch(err) {
      window.changePage(err.status);
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
    
    return this.DOM.innerHTML = `
    <article class="one_product">
    <img src="${props.imageUrl}" alt="Photo de l'ours en peluche" class="img_product">
    <h2 class="title_product">${props.name}</h2>
    <p class="content_product">${props.description}</p>
      <span class="price_product">${props.price / 100 + ".00 €"}</span>
      <select class="colors_product">
        <option>Choisissez une couleur${colors}</option> 
      </select>
      <label for="quantity" class="label_quantity">Choisissez une quantité : </label>
      <input type="number" value="1" class="product_quantity" id="quantity" min="1" max="10">
    <button type="submit" class="btn_add" onclick="page.addToCart()">Ajouter au panier</button>
    </article>
    `
  }

  // Fonction qui gère le bouton pour Ajouter le produit au panier
  addToCart(){
    const selectOptions = document.querySelector("select"); // Selection d'une couleur de peluche
    // console.log(selectOptions.value); Vérifie si la valeur est bien séléctionné
    const quantity = document.querySelector('input');
    // console.log(quantity.value);
    // Récupération des valeurs du produit dans un objet
    let optionsProduct = {
      _id: this.product._id,
      name: this.product.name,
      price: parseFloat(this.product.price * quantity.value) / 100,
      colors: selectOptions.value,
      quantite: quantity.value,
    };
    // console.log(optionsProduct); // Vérifie que l'objet est bien créé

    // Récupération de l'objet dans le LS
    let basket = [];
    let basketProduct = localStorage.getItem('products')

    // Si le LS n'est pas vide
    if (localStorage.getItem("products") !== null) {
      basket = JSON.parse(localStorage.getItem("products"));
      // Vérifie que si le produit est déjà dans le localStorage (par son id ET sa couleur)
      if (basketProduct.indexOf(this.product._id) !== -1 && basketProduct.indexOf(selectOptions.value) !== -1) {
        alert("Produit déjà présent dans le panier !")
      } else {
        basket.push(optionsProduct);
      localStorage.setItem("products", JSON.stringify(basket));
      cart.refresh();
      }
    } else {

      // Si le localStorage est vide on le crée
      basket.push(optionsProduct);
      localStorage.setItem("products", JSON.stringify(basket));
      cart.refresh();
    }
    // console.log(basket); Vérifie si les objets sont bien push dans le tableau
  }

}
      
    
    


  
  
