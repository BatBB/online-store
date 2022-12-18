import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
let checkedCategory: string[] = [];
import ProductPage from './components/ProductPage/ProductPage';

class App {
    private container: HTMLElement;
    private header = new Header('header', 'header');
    // private mainPage = ;
    private productPage = new ProductPage('main', 'main');
    private footer = new Footer('footer', 'footer');
    static mainPage = new MainPage('main', 'main');

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

    static listenerAside() {
        const filterContainer = document.querySelector('.filter_list');

        filterContainer?.addEventListener('change', (e: Event) => {
            console.log(true);
            const target = e.target as HTMLInputElement;
            if (target.checked) {
                checkedCategory.push(target.id);
            } else if (!target.checked) {
                checkedCategory = checkedCategory.filter((category) => category !== target.id);
            }
            App.mainPage.render();
        });
        return checkedCategory;
    }

    run() {
        this.container.append(this.header.render());
        this.container.append(App.mainPage.render());
        this.container.append(this.footer.render());
        App.listenerAside();
    }
}

export { App, checkedCategory };
