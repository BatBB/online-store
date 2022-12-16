import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import Loader from './loader/Loader';

class App {
    private container: HTMLElement;
    header = new Header('header', 'header');
    main = new MainPage('main', 'main');
    footer = new Footer('footer', 'footer');

    loader = new Loader();

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.append(this.header.render());
        this.container.append(this.main.render());
        this.container.append(this.footer.render());
    }
}

export default App;
