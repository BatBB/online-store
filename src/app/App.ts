import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import Route from './routes/routes';

class App {
    private container: HTMLElement;
    private headerPage = new Header('header', 'header');
    private mainPage = new MainPage('div', 'main-page');
    private footerPage = new Footer('footer', 'footer');

    private renderCurrentPage = () => {
        const mainElement = document.createElement('main');
        mainElement.className = 'main';
        mainElement.id = 'main';
        mainElement.append(this.mainPage.render());
        return mainElement;
    };

    route = new Route();

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.append(this.headerPage.render());
        this.container.append(this.renderCurrentPage());
        this.container.append(this.footerPage.render());

        this.route.eventHashChange();
    }
}

export default App;
