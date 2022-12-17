import Loader from '../../loader/Loader';
import Component from '../Component';
import Product from '../Product/Product';
import IProduct from './../interfaces/IProduct';
import './productsList.scss';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    async renderProducts() {
        const loader = new Loader();
        const products = await loader.fetchData();

        if (products) {
            products.forEach((product: IProduct) => {
                const productItem = new Product('div', 'product-item');
                productItem.renderProduct(product);
                this.container.append(productItem.render());
            });
        }

        return products;
    }

    render() {
        void this.renderProducts();
        return this.container;
    }
}

export default ProductsList;
