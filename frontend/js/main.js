const dataManager = new DataManager('http://localhost:3000/api/teddies');
new Index(document.querySelector('main'), dataManager);

