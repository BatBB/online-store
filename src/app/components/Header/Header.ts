import createElement from '../../libs/createElement';
import svgImages from '../../libs/svgImages';
import CartPage from '../../pages/CartPage/CartPage';
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

        const countProductsHeader = document.querySelector('.header__link-count');
        const cartTotalHeader = document.querySelector('.header__total-text');

        const productsInCart = localStorage.getItem('productsInCart');

        let count = 0;
        let cartTotal = 0;
        if (productsInCart !== null) {
            const products: ICartData[] = <ICartData[]>JSON.parse(productsInCart);
            count = products.reduce((totalCount: number, prod) => prod.count + totalCount, 0);
            cartTotal = CartPage.totalCountProduct();
        }

        if (countProductsHeader) countProductsHeader.textContent = count.toString();
        if (cartTotalHeader) cartTotalHeader.textContent = cartTotal.toString();
    };

    private renderHeader() {
        const route = new Route();

        const logo = createElement('h1', 'header__link-logo');
        logo.textContent = 'OnlineStore';

        const logoLink = createElement('a', 'header__link');
        logoLink.append(logo);
        logoLink.addEventListener('click', (event: Event) => {
            event.preventDefault();
            if (window.location.hash) window.location.hash = '';
            void route.router('/');
        });

        const totalCart = createElement('div', 'header__total');
        totalCart.innerHTML = `Cart total: <span class="header__total-text">${
            CartPage.totalCountProduct() || 0
        }</span> $`;

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

        const containerBlock = createElement('div', 'container');

        containerBlock.append(logoLink);
        containerBlock.append(totalCart);
        containerBlock.append(cartLink);
        return containerBlock;
    }

    render() {
        this.container.append(this.renderHeader());
        return this.container;
    }
}

export default Header;
