import IProduct from '../components/interfaces/IProduct';
import IProductsData from '../components/interfaces/IProductsData';

class Loader {
    // eslint-disable-next-line no-unused-vars
    fetchData(callback: (data: IProduct[]) => void) {
        fetch('https://dummyjson.com/products?limit=100')
            .then((res) => res.json())
            .then((data: IProductsData) => callback(data.products))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
