import createElement from '../../libs/createElement';
import Route from '../../routes/routes';
import Component from '../Component';
import ICartData from '../interfaces/ICartData';
import './header.scss';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private productsInCartArr = [
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 2,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 1,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 1,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 1,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 3,
        },
    ];

    private getProductsCount = () => {
        // товары в корзине и их количество будут храниться в localStorage (ключ productsInCart)
        // localStorage.setItem('productsInCart', JSON.stringify(this.productsInCartArr));
        console.log(localStorage.getItem('productsInCart'));

        const data = localStorage.getItem('productsInCart');
        if (data !== null) {
            const products: ICartData[] = <ICartData[]>JSON.parse(data);
            return products.reduce((total: number, prod) => prod.count + total, 0);
        } else {
            return 0;
        }
    };

    private renderHeader() {
        const route = new Route();

        const logo = createElement('h1', 'header__link-logo');
        logo.textContent = 'OnlineStore';

        const logoLink = createElement('a', 'header__link');
        logoLink.append(logo);
        logoLink.addEventListener('click', () => {});
        logoLink.addEventListener('click', (event: Event) => {
            event.preventDefault();
            if (window.location.hash) window.location.hash = '';
            void route.router('/');
        });

        const cartLink = createElement('a', 'header__link header__link-cart');
        cartLink.innerHTML = `
        <div class="header__link-cart-img">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
                <g>
                    <g>
                        <path d="m464.5,301.1l36.5-178h-359.7l-12.5-59.2-108.4-52.9-9.4,18.7 99,47.8 50,238.8h289c0,0 28.5,17.9 17.5,40.5-4.9,7-12.5,15.6-26.1,15.6h-287.6v20.6h287.7c19.8,0 36.5-10.4 45.9-27 18.4-34.4-21.9-64.9-21.9-64.9zm-286.7-5.7l-32.3-151.6h330.5l-31.3,151.6h-266.9z"/>
                        <path d="m212.2,422.1c-21.9,0-39.6,17.6-39.6,39.4s17.7,39.4 39.6,39.4 39.6-17.6 39.6-39.4-17.7-39.4-39.6-39.4zm0,58.1c-10.4,0-18.8-8.3-18.8-18.7s8.3-18.7 18.8-18.7 18.8,8.3 18.8,18.7-8.4,18.7-18.8,18.7z"/>
                        <path d="m424.9,422.1c-21.9,0-39.6,17.6-39.6,39.4s17.7,39.5 39.6,39.5 40.7-17.6 39.6-39.4c0-21.8-17.7-39.5-39.6-39.5zm18.8,39.5c0,10.4-8.3,18.7-18.8,18.7s-18.8-8.3-18.8-18.7 8.3-18.7 18.8-18.7 19.8,8.3 18.8,18.7z"/>
                    </g>
                </g>
            </svg>
        </div>
        <div class = "header__link-count">${this.getProductsCount()}</div>`;
        cartLink.addEventListener('click', (event: Event) => {
            event.preventDefault();
            console.log(window.location.hash);
            window.location.hash = '/cart';
            void route.router('/cart');
        });

        this.container.append(logoLink);
        this.container.append(cartLink);
    }

    render() {
        this.renderHeader();
        return this.container;
    }
}

export default Header;
