import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import Route from './routes/routes';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import createElement from './libs/createElement';
import MainPage from './pages/MainPage/MainPage';
import userQuery from './libs/userQuery';
import ModalPay from './components/ModalOrdering/ModalPay';

class App {
    private container: HTMLElement;
    private headerPage = new Header('header', 'header');
    private footerPage = new Footer('footer', 'footer');
    private modalPay = new ModalPay('div', 'pay hidden');
    private route = new Route();

    static renderCurrentPage = (page: string) => {
        const mainBlock = document.getElementById('main');
        let currentPage: HTMLElement;
        const mainPage = new MainPage('div', 'main-page');
        const productPage = new ProductPage('div', 'product-page-container');
        const cartPage = new CartPage('div', 'cart-page');
        if (mainBlock) {
            mainBlock.innerHTML = '';
            switch (page) {
                case 'main-page':
                    currentPage = mainPage.render();
                    break;
                case 'product-page':
                    productPage.renderProductPage();
                    currentPage = productPage.render();
                    break;
                case 'cart-page':
                    currentPage = cartPage.render();
                    break;
                default:
                    //error 404
                    currentPage = createElement('div', 'error404');
                    currentPage.textContent = 'Error 404';
                    break;
            }
            mainBlock.append(currentPage);
        }
    };

    private createMainBlock = () => {
        const mainElement = createElement('main', 'main');
        mainElement.id = 'main';
        return mainElement;
    };

    private globalHandler() {
        window.document.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.id === 'lower-price') {
                userQuery.price.min = +target.value;
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                userQuery.userParams?.searchParams.set('price', `${userQuery.price.min}|${userQuery.price.max}`);
            }
            if (target.id === 'upper-price') {
                userQuery.price.max = +target.value;
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                userQuery.userParams?.searchParams.set('price', `${userQuery.price.min}|${userQuery.price.max}`);
            }

            if (target.id === 'lower-stock') {
                userQuery.stock.min = +target.value;
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                userQuery.userParams?.searchParams.set('stock', `${userQuery.stock.min}|${userQuery.stock.max}`);
            }
            if (target.id === 'upper-stock') {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                userQuery.userParams?.searchParams.set('stock', `${userQuery.stock.min}|${userQuery.stock.max}`);
                userQuery.stock.max = +target.value;
            }
            //

            if (target.checked && target.parentElement?.parentElement!.className === 'filter-list__inner--Category') {
                userQuery.category.push(target.id);
                userQuery.userParams?.searchParams.set('category', userQuery.category.join('|'));
                // if (!userQuery.userParams?.searchParams.get('category')) console.log(true);
            } else if (
                !target.checked &&
                target.parentElement?.parentElement!.className === 'filter-list__inner--Category'
            ) {
                userQuery.category = userQuery.category.filter((category) => category !== target.id);
                userQuery.userParams?.searchParams.set('category', userQuery.category.join('|'));
                if (userQuery.userParams?.searchParams.get('category') === '') {
                    userQuery.userParams?.searchParams.delete('category');
                }
            } else if (
                target.checked &&
                target.parentElement?.parentElement!.className === 'filter-list__inner--Brand'
            ) {
                userQuery.brand.push(target.id);
                userQuery.userParams?.searchParams.set('brand', userQuery.brand.join('|'));
            } else if (
                !target.checked &&
                target.parentElement?.parentElement!.className === 'filter-list__inner--Brand'
            ) {
                userQuery.brand = userQuery.brand.filter((brand) => brand !== target.id);
                userQuery.userParams?.searchParams.set('brand', userQuery.brand.join('|'));
                if (userQuery.userParams?.searchParams.get('brand') === '') {
                    userQuery.userParams?.searchParams.delete('brand');
                }
            } else if (target.name === 'sort-select') {
                switch (target.value) {
                    case 'sort-recommended':
                        userQuery.sort = 'recommended';
                        break;
                    case 'sort-price-low':
                        userQuery.sort = 'price-low';

                        break;
                    case 'sort-price-high':
                        userQuery.sort = 'price-high';

                        break;
                    case 'sort-rate-low':
                        userQuery.sort = 'rate-low';

                        break;
                    case 'sort-rate-high':
                        userQuery.sort = 'rate-high';

                        break;
                }
                userQuery.userParams?.searchParams.set('sort', userQuery.sort);
            }

            if (userQuery.userParams?.search.toString() == '') {
                history.pushState({}, '', '/');
            } else {
                history.pushState({}, '', userQuery.userParams?.search);
            }
            MainPage.productsList.render();
            // console.log(userQuery.userParams?.search)
        });
    }

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.append(this.headerPage.render());
        this.container.append(this.createMainBlock());
        this.container.append(this.footerPage.render());

        App.renderCurrentPage('main-page');
        this.container.append(this.modalPay.render());
        this.modalPay.closeModalPay();

        this.route.eventDOMContentLoaded();
        this.route.eventHashChange();
        Header.updateCountProduct();
        CartPage.updateTotalPrice();
        this.globalHandler();
    }
}

export default App;
