import { App, checkedCategory } from '../../App';
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
        let products = await loader.fetchData();
        if (checkedCategory.category.length > 0 && checkedCategory.brand.length > 0) {
            products = products?.filter((item) => {
                return checkedCategory.category.includes(item.category) && checkedCategory.brand.includes(item.brand);
            });
        } else if (checkedCategory.category.length > 0 && checkedCategory.brand.length === 0) {
            products = products?.filter((item) => checkedCategory.category.includes(item.category));
        } else if (checkedCategory.brand.length > 0 && checkedCategory.category.length === 0) {
            products = products?.filter((item) => checkedCategory.brand.includes(item.brand));
        } else {
            products = await loader.fetchData();
        }

        const productPage = new ProductPage('section', 'product-page');
        if (products) {
            const container = document.querySelector('.products-list');
            container!.innerHTML = '';
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
    }

    render() {
        void this.renderProducts();
        return this.container;
    }
}

export default ProductsList;
