import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import Route from './routes/routes';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import createElement from './libs/createElement';

class App {
    private container: HTMLElement;
    private headerPage = new Header('header', 'header');
    private footerPage = new Footer('footer', 'footer');
    private route = new Route();

    static renderCurrentPage = (page: string) => {
        const mainBlock = document.getElementById('main');
        let currentPage: HTMLElement;
        const mainPage = new MainPage('div', 'main-page');
        const productPage = new ProductPage('div', 'product-page');
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
        const mainElement = document.createElement('main');
        mainElement.className = 'main';
        mainElement.id = 'main';
        return mainElement;
    };

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.append(this.headerPage.render());
        this.container.append(this.createMainBlock());
        this.container.append(this.footerPage.render());
        App.renderCurrentPage('main-page');

        this.route.eventDOMContentLoaded();
        this.route.eventHashChange();
    }
}

export default App;
