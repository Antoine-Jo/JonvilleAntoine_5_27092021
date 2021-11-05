// Définit un schéma des datas reçu 
/**
    * 
    * @typedef  {Object} FicheProduit
    * @property {String} _id      // "5be9c8541c9d440000665243",
    * @property {String} name      // "Norbert",
    * @property {Number} price      // 2900,
    * @property {String} imageUrl      // "http://localhost:3000/images/teddy_1.jpg",
    * @property {String} description      // "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    * @property {String} colors      // "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    */

/**
 * @typedef {Object}  pageInformation
 * @property {String}         page    la page à afficher
 * @property {String | null}  args    l'id du produit
 */

/**
 * @typedef {Object} FicheOrder
 * @property {String} firstName   // Prénom client
 * @property {String} lastName  // Nom du client
 * @property {String} address  // Adresse du client
 * @property {String} city  // Ville du client
 * @property {String} email  // Email du client
 * @property {String} products  // Id des produits du panier
 */

module.exports = {};