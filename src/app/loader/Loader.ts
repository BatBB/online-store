import IProductsData from '../components/interfaces/IProductsData';

class Loader {
    // static validLink(link: string) {

    // }

    // static links = {

    // }

    static async fetchData() {
        try {
            const data = await fetch('https://dummyjson.com/products?limit=100');
            const dataJSON = await (<Promise<IProductsData>>data.json());
            return dataJSON.products;
        } catch (error) {
            console.error(error);
        }
    }
}

export default Loader;
