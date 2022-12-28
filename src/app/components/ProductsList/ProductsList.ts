import { App, userQuery } from '../../App';
import Loader from '../../loader/Loader';
import Component from '../Component';
import Product from '../Product/Product';
import IProduct from '../interfaces/IProduct';
import './productsList.scss';
import ProductPage from '../ProductPage/ProductPage';
// import handlerAside from '../Aside/handlerAside';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    async renderProducts() {
        const loader: Loader = new Loader();
        const urlParams = new URL(location ? location.href : window.location.href);
        let products = await loader.fetchData();
        if (urlParams.searchParams.get('category') && urlParams.searchParams.get('brand')) {
            products = products?.filter((item) => {
                return (
                    String(urlParams.searchParams.getAll('category')).includes(item.category) &&
                    String(urlParams.searchParams.getAll('brand')).includes(item.brand)
                );
            });
        } else if (
            urlParams.searchParams.getAll('category')!.length > 0 &&
            urlParams.searchParams.getAll('brand').length === 0
        ) {
            products = products?.filter((item) =>
                String(urlParams.searchParams.getAll('category')).includes(item.category)
            );
        } else if (
            urlParams.searchParams.getAll('brand').length > 0 &&
            urlParams.searchParams.getAll('category').length === 0
        ) {
            products = products?.filter((item) => String(urlParams.searchParams.getAll('brand')).includes(item.brand));
        } else {
            products = await loader.fetchData();
        }
        // products = products?.filter((item) => {
        //     const price = userQuery.userParams?.searchParams.get('price')!;
        //     console.log(price);
        //     item.price >= +price?.slice(0, price.indexOf('|')) && item.price <= +price?.slice(price.indexOf('|'));
        // });
        products = products?.filter((item) => item.stock >= userQuery.stock.min! && item.stock <= userQuery.stock.max!);
        products = products?.filter((item) => item.price >= userQuery.price.min! && item.price <= userQuery.price.max!);

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
