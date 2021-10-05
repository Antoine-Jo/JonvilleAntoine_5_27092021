class Page404 extends Page{
    constructor(domTarget){
        super(domTarget, null);
        this.render();
    }


    render(){
        this.DOM.innerText="404";
    }
}