class Page404 extends Page{
    constructor(domTarget){
        super(domTarget, null);
        this.render();
        //history.deleteUrl({url: urlToRemove});
        // this.goHome();
    }


    render(){
        this.DOM.innerHTML = `
            <img src="./images/ourson.jpg" alt="Photo d'ourson triste" class="err_img">
            <div class="err_container">
                <h2 class="err_title">Désolé !</h2>
                <p class="err_text">La page que vous cherchez n'existe pas...</p>
                <button type="button" class="err_btn" onclick="javascript:history.go(-2)">Retour à l'accueil</button>
            </div>
        
        `
    }

    // goHome() {
    //     let btn = document.querySelector('button');
    //     btn.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         window.changePage('index', "frontend/");
    //     })
    // }
}