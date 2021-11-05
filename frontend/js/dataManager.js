/**
 * @typedef {import('./typedef.js').FicheProduit}  FicheProduit
 * @typedef {import('./typedef.js').FicheOrder}  FicheOrder
 * 
 */
// Class défini des datas
class DataManager {
    constructor(src) {
        this.src = src;
    }

    // Fonction qui récupère toutes les datas de l'API
    async getAllData() {
        try{
          const res = await fetch(this.src);
          this.data = await res.json();
        }
        catch(err){
            throw {
                status : 404,
                details : err
            }
        }
        // console.log(this.data); Permet de vérifier qu'on reçoit bien les datas depuis le back
    }

    // Fonction qui permets d'envoyer les datas reçu dans un array et pouvoir les manipuler
    /**
     * [getProducts description]
     *
     * @return  {Promise.<FicheProduit>}  [return description]
     */
    async getProducts() {
        try {

            if (this.data === undefined) await this.getAllData();
            const result = [];
            for (const value of Object.values(this.data)) {
                result.push(value);
            }
            return result;
        }
        catch (error) {
            let productsContainer = document.createElement("div");
            document.querySelector('main').appendChild(productsContainer)
            productsContainer.classList.add('error')
            productsContainer.innerHTML =
            "La connexion au serveur n'a pas pu être effectué. Veuillez patienter quelques secondes ! <br>Si le problème persiste, contactez nous.";
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
    }


    /**
     * [getProduct description]
     *
     * @param   {String}  id  [id description]
     *
     * @return  {Promise.<FicheProduit>}      [return description]
     */
    // Fonction qui permet de récupérer les datas d'un produit en fonction de son ID
    async getProduct(id) {
        try{
            if (this.data === undefined) await this.getAllData();
            for( const product of this.data){
                if(product._id === id) return product;
            }
            throw { status : 404, details : "le produit demandé n'est pas dans la liste de produits disponibles"}
        }
        catch(err){
            throw err;
        }
    }

    // Fonction permettant le POST afin de récupérer un orderID du back
    /**
     * 
     * @param {FicheOrder} order 
     * @returns {String}
     */
    async sendOrder(order){
        const res = await fetch(this.src+'/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        return await res.json();
    }
}
