class DataManager {
    constructor(src) {
        this.src = src;
    }

    async getAllData() {
        const res = await fetch(this.src);
        this.data = await res.json();
    }

    async getProducts() {
        if (this.data === undefined) await this.getAllData();
        const result = [];
        for (const value of Object.values(this.data)) {
            result.push(value);
        }
        return result;
    }
}