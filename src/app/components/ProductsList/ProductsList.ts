import Loader from '../../loader/Loader';
import Component from '../Component';
import Product from '../Product/Product';
import IProduct from './../interfaces/IProduct';
import userQuery from '../../libs/userQuery';

import './productsList.scss';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    async renderProducts() {
        let products = await Loader.fetchData();
        const urlParams = new URL(location ? location.href : window.location.href);
        if (urlParams.searchParams.get('category') && urlParams.searchParams.get('brand')) {
            products = products?.filter((item) => {
                return (
                    urlParams.searchParams.getAll('category').includes(item.category) &&
                    urlParams.searchParams.getAll('brand').includes(item.brand)
                );
            });
        } else if (
            urlParams.searchParams.getAll('category')!.length > 0 &&
            urlParams.searchParams.getAll('brand').length === 0
        ) {
            products = products?.filter((item) => {
                return urlParams.searchParams.getAll('category').includes(item.category);
            });
        } else if (
            urlParams.searchParams.getAll('brand').length > 0 &&
            urlParams.searchParams.getAll('category').length === 0
        ) {
            products = products?.filter((item) => urlParams.searchParams.getAll('brand').includes(item.brand));
        } else {
            products = await Loader.fetchData();
        }

        products = products?.filter((item) => item.stock >= userQuery.stock.min! && item.stock <= userQuery.stock.max!);
        products = products?.filter((item) => item.price >= userQuery.price.min! && item.price <= userQuery.price.max!);

        if (products) {
            this.container.innerHTML = '';
            products.forEach((product: IProduct) => {
                const productItem = new Product('div', 'product-item');
                productItem.renderProduct(product);
                this.container.append(productItem.render());
            });
        }
    }

    render() {
        void this.renderProducts();
        return this.container;
    }
}

export default ProductsList;
