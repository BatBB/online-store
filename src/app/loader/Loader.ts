import IProductsData from '../components/interfaces/IProductsData';

class Loader {
    // eslint-disable-next-line no-unused-vars
    async fetchData() {
        try {
            const data = await fetch('https://dummyjson.com/products?limit=10');
            const dataJSON = await (<Promise<IProductsData>>data.json());
            return dataJSON.products;
        } catch (error) {
            console.error(error);
        }
    }
}

export default Loader;
