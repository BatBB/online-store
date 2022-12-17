import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import ProductPage from './components/ProductPage/ProductPage';

class App {
    private container: HTMLElement;
    private header = new Header('header', 'header');
    private mainPage = new MainPage('main', 'main');
    private productPage = new ProductPage('main', 'main');
    private footer = new Footer('footer', 'footer');

    static renderPage(page: HTMLElement) {
        const currentPage = document.querySelector('main');
        if (currentPage) {
            console.log(page);
            currentPage.innerHTML = '';
            currentPage.append(page);
        }
    }

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.append(this.header.render());
        this.container.append(this.mainPage.render());
        this.container.append(this.footer.render());
    }
}

export default App;
