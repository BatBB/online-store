import createElement from '../../libs/createElement';
import svgImages from '../../libs/svgImages';
import Route from '../../routes/routes';
import Component from '../Component';
import ICartData from '../interfaces/ICartData';
import './header.scss';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    static updateCountProduct = () => {
        // товары в корзине и их количество будут храниться в localStorage (ключ productsInCart)
        // console.log(localStorage.getItem('productsInCart'));

        const countProductsHeader = document.querySelector('.header__link-count');

        const productsInCart = localStorage.getItem('productsInCart');

        let count = 0;
        if (productsInCart !== null) {
            const products: ICartData[] = <ICartData[]>JSON.parse(productsInCart);
            count = products.reduce((total: number, prod) => prod.count + total, 0);
        }

        if (countProductsHeader) countProductsHeader.textContent = count.toString();
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
            ${svgImages.cart}
        </div>
        <span class="header__link-count">000</span>`;
        cartLink.addEventListener('click', (event: Event) => {
            event.preventDefault();
            window.location.hash = '/cart';
            void route.router('/cart');
        });

        this.container.append(logoLink);
        this.container.append(cartLink);

        // console.log(document.querySelector('.header__link-count'));
    }

    render() {
        this.renderHeader();
        return this.container;
    }
}

export default Header;
