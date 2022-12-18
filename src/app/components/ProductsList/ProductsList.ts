import App from '../../App';
import Loader from '../../loader/Loader';
import Component from '../Component';
import Product from '../Product/Product';
import IProduct from '../interfaces/IProduct';
import './productsList.scss';
import ProductPage from '../ProductPage/ProductPage';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    async renderProducts() {
        const loader = new Loader();
        const products = await loader.fetchData();
        const productPage = new ProductPage('section', 'product-page');

        if (products) {
            products.forEach((product: IProduct) => {
                const productItem = new Product('div', 'product-item');
                productItem.renderProduct(product);
                const productElement = productItem.render();
                productElement.addEventListener('click', () => {
                    App.renderPage(productPage.renderProductPage(product));
                });
                this.container.append(productElement);
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
