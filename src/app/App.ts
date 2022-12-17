import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import ProductPage from './components/ProductPage/ProductPage';

class App {
    private container: HTMLElement;
    header = new Header('header', 'header');
    mainPage = new MainPage('main', 'main');
    productPage = new ProductPage('main', 'product-page');
    footer = new Footer('footer', 'footer');

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
