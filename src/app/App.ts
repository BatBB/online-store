import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';

class App {
    private container: HTMLElement;
    header = new Header('header', 'header');
    footer = new Footer('footer', 'footer');

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.append(this.header.render());
        this.container.append(this.footer.render());
    }
}

export default App;
