import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import Route from './routes/routes';
import ProductPage from './pages/ProductPage/ProductPage';

class App {
    private container: HTMLElement;
    private headerPage = new Header('header', 'header');
    private footerPage = new Footer('footer', 'footer');
    private route = new Route();

    static renderCurrentPage = (page: string) => {
        const mainBlock = document.getElementById('main');
        if (mainBlock) {
            mainBlock.innerHTML = '';
            if (page === 'main-page') {
                const mainPage = new MainPage('div', 'main-page');
                mainBlock.append(mainPage.render());
            }
            if (page === 'product-page') {
                const productPage = new ProductPage('div', 'product-page');
                productPage.renderProductPage();
                mainBlock.append(productPage.render());
            }
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
