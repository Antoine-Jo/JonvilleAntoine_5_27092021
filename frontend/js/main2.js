const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
const dataManager = new DataManager(`http://localhost:3000/api/teddies/${id}`);
const product = new Product(document.querySelector('main'), dataManager);

  