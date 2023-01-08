import Loader from '../../loader/Loader';
import Component from '../Component';
import Product from '../Product/Product';
import IProduct from './../interfaces/IProduct';
import userQuery from '../../libs/userQuery';
import './productsList.scss';
import createElement from '../../libs/createElement';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private renderPaginationNumber(countPages: number, currentPaginationPage: number) {
        const paginationPageNumbersContainer = document.querySelector('.main__pagination-numbers');
        if (paginationPageNumbersContainer) {
            paginationPageNumbersContainer.innerHTML = '';
            const paginationPageNumberList = createElement('ul', 'main__pagination-numbers-list');

            for (let i = 1; i <= countPages; i++) {
                const paginationPageNumberItem = createElement('li', 'main__pagination-numbers-item');
                if (i === currentPaginationPage) {
                    paginationPageNumberItem.classList.add('checked');
                }
                paginationPageNumberItem.textContent = i.toString();
                paginationPageNumberList.append(paginationPageNumberItem);
            }
            paginationPageNumbersContainer.append(paginationPageNumberList);
        }
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

        if (userQuery.sort) {
            switch (userQuery.sort) {
                case 'recommended':
                    products = products?.sort((productA, productB) => productA.id - productB.id);
                    break;
                case 'price-low':
                    products = products?.sort((productA, productB) => productA.price - productB.price);
                    break;
                case 'price-high':
                    products = products?.sort((productA, productB) => productB.price - productA.price);
                    break;
                case 'rate-low':
                    products = products?.sort((productA, productB) => productA.rating - productB.rating);
                    break;
                case 'rate-high':
                    products = products?.sort((productA, productB) => productB.rating - productB.rating);
                    break;
            }
        }

        let currentPage: number = urlParams.searchParams.get('page') ? Number(urlParams.searchParams.get('page')) : 1;
        const countProductsOnPage: number = urlParams.searchParams.get('count')
            ? Number(urlParams.searchParams.get('count'))
            : 10;

        if (currentPage > Math.ceil((products?.length || 1) / countProductsOnPage)) {
            currentPage = Math.ceil((products?.length || 1) / countProductsOnPage);
        }

        const productsListContainer = createElement('div', 'main__products-list');
        productsListContainer.innerHTML = '';

        if (products) {
            const countPages = Math.ceil(products.length / countProductsOnPage);
            const startProduct = (currentPage - 1) * countProductsOnPage;
            const endProduct =
                startProduct + countProductsOnPage < products.length
                    ? startProduct + countProductsOnPage
                    : products.length;

            // render pagination numbers container
            this.renderPaginationNumber(countPages, currentPage);

            this.container.innerHTML = '';
            products.forEach((product: IProduct, index: number) => {
                const productItem = new Product('div', 'product-item');
                if (index >= startProduct && index < endProduct) {
                    productItem.renderProduct(product);
                    productsListContainer.append(productItem.render());
                }
                // this.container.append(productItem.render());
            });
            // renderCurrentPage(currentPage);
        }
        this.container.append(productsListContainer);
    }

    render() {
        void this.renderProducts();
        return this.container;
    }
}

export default ProductsList;
