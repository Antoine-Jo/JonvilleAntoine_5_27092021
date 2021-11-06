/**
 * @typedef {import("./typedef").pageInformation} pageInformation
 */

class Router {
  page;
  constructor(domTarget) {
    this.DOM = domTarget;
    this.dataManager = new DataManager("http://localhost:3000/api/teddies");
    window.changePage = this.changePage.bind(this);
    this.showPage(this.extractPage());
    window.onpopstate = () =>  this.showPage(this.extractPage());
    this.returnIndex();
    this.basket();
  }

  /**
   * Fonction qui affiche les différentes pages
   * @param   {pageInformation} request   les informations de la page à afficher
   * @returns {void}                      insert  la bonne page dans le DOM
   */
  showPage(request) {
      console.log(request)
    this.DOM.innerText = "";

    switch (request.page) {
      case "index":
        window.page = new Index(this.DOM, this.dataManager);
        return;
      
      case "product":
        window.page = new Product(
          this.DOM,
          this.dataManager,
          request.args
        );
        return;
      case "panier":
        window.page = new Panier(this.DOM);
        return;
      case "confirmation":
        window.page = new Confirmation(this.DOM)
        return;
      case "form":
        window.page = new Form(this.DOM, this.dataManager)
        return;
      case "404":
        window.page = new Page404(this.DOM);
        return;     
      default:
        window.page = new Page404(this.DOM);
      }
  }

  
  // Fonction qui permet de changer de page
  /**
   * [changePage description]
   *
   * @param   {pageInformation}  [newPage description]
   * 
   *
   * @return  {void}           [return description]
   */
  changePage(newPage, args = null) {
    let url = newPage === "index" ? window.location.pathname : "?"+newPage; 
    if (args !== null) url += "/"+args;
    history.pushState({}, newPage, url);
    this.showPage({page:newPage, args});
  }
  
  /**
   * Fonction pour changer l'URL de la page
   *
   * @return  {pageInformation}  les informations de la page à afficher
   */
  extractPage() {
    const answer = {
      page: window.location.search.slice(1),
      args: null,
    };
    if (answer.page === "") answer.page="index";
    if (answer.page.indexOf("/") > -1) {
      const [page, args] = answer.page.split("/");
      answer = {args, page};
    }
    return answer;
  }

  // Fonction Retour à l'accueil en cliquant sur le logo dans le Header
  returnIndex() {
    let home = document.querySelector('.header_name');
    home.addEventListener('click', () => {
      // window.changePage('index', "index");
      window.changePage('index');
    })
  }
  // Fonction pour ouvrir la page Panier sur l'icone dans le header
  basket() {
    let basket = document.querySelector('.header_icon');
    basket.addEventListener('click', () => {
      window.changePage("panier");
    })
  }
}



