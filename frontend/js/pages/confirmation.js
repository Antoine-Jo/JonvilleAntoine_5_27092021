class Confirmation extends Page {
    constructor(domTarget) {
        super(domTarget, null)
        this.render();
        
    }

    render() {
        this.DOM.innerHTML = `
            <h3>Coucou</h3>
        `
    }

}