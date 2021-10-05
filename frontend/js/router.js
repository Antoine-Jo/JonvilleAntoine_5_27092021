class Router {
  constructor(domTarget) {
    this.DOM = domTarget;
    this.dataManager = new DataManager("http://localhost:3000/api/teddies");
    window.changePage = this.changePage.bind(this);
    this.showPage(this.extractPage());
  }

  /**
   *
   * @param {Object} request
   * @param {String} request.page
   * @param {String | null} request.args
   * @returns {void}
   */
  showPage(request) {
      console.log(request.page === "product", request.args)
    switch (request.page) {
      case "index":
        return (this.page = new Index(this.DOM, this.dataManager));
      case "product":
        return this.page = new Product(
          this.DOM,
          this.dataManager,
          request.args
        )   ;
      default:
        this.page = new Page404(this.DOM);
    }
  }
  changePage(newPage, args = null) {
      console.log(newPage, args);
    this.showPage({page:newPage, args});
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
}
