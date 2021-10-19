class Router {
  page;
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
      case "404":
        window.page = new Page404(this.DOM);
        return;     
      default:
        window.page = new Page404(this.DOM);
      }
  }

  changePage(newPage, args = null) {
    let url = newPage === "index" ? "" : "?"+newPage; 
    if (args !== null) url += "/"+args;
    history.pushState({}, newPage, url);
    this.showPage({page:newPage, args});
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
      // window.changePage('index', 'index.html');
      history.go(-1);
    })
  }
}



