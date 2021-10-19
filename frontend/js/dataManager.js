/**
 * @typedef {import('./typedef.js').FicheProduit}  FicheProduit
 */

class DataManager {
    constructor(src) {
        this.src = src;
    }

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
        // console.log(this.data);
    }

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
}
