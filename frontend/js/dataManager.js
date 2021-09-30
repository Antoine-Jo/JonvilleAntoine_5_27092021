class DataManager {
    constructor(src) {
        this.src = src;
    }

    async getAllData() {
        const res = await fetch(this.src);
        this.data = await res.json();
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
        }
    }

    async getProduct() {
        if (this.data === undefined) await this.getAllData();
            const result = [];
            
                result.push(Object.values(this.data));
                
        
            return result;
        }
    }
