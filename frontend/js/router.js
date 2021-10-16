class Router {
  constructor(domTarget) {
    this.DOM = domTarget;
    this.dataManager = new DataManager("http://localhost:3000/api/teddies");
    window.changePage = this.changePage.bind(this);
    this.showPage(this.extractPage());
    window.onpopstate = () =>  this.showPage(this.extractPage());
    this.returnIndex();
    
  }

  /**
   *
   * @param {Object} request
   * @param {String} request.page
   * @param {String | null} request.args
   * @returns {void}
   */
  showPage(request) {
      // console.log(request.page === "product", request.args)
    this.DOM.innerText = "";

    switch (request.page) {
      case "index":
        this.page = new Index(this.DOM, this.dataManager);
        return;
      
      case "product":
        this.page = new Product(
          this.DOM,
          this.dataManager,
          request.args
        );
        return;
      case "404":
        this.page = new Page404(this.DOM);
      break;     
      default:
        this.page = new Page404(this.DOM);
      }
  }

  changePage(newPage, args = null) {
    let url = newPage === "index" ? "" : "?"+newPage; 
    if (args !== null) url += "/"+args;
    history.pushState({}, newPage, url);
    this.showPage({page:newPage, args});
    console.log(newPage, args);
    //changer la barre d'adresse
  }

  extractPage() {
    const answer = {
      page: window.location.search.slice(1),
      args: null,
    };
    if (answer.page === "") answer.page="index";
    if (answer.page.indexOf("/") > -1) {
      const tmp = answer.page.split("/");
      answer.args = tmp[1];
      answer.page = tmp[0];
    }
    return answer;
  }


  returnIndex() {
    let home = document.querySelector('.header_logo');
    home.addEventListener('click', () => {
      window.changePage('index', "frontend/");
    })
  }
}



