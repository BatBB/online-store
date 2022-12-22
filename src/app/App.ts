import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
// import ProductPage from './components/ProductPage/ProductPage';
type CheckedCategoryType = {
    category: Array<string>;
    brand: Array<string>;
};
const checkedCategory: CheckedCategoryType = {
    category: [],
    brand: [],
};

class App {
    private container: HTMLElement;
    private header = new Header('header', 'header');
    // private mainPage = ;
    // private productPage = new ProdusctPage('main', 'main');
    private footer = new Footer('footer', 'footer');
    static mainPage = new MainPage('main', 'main');

    static renderPage(page: HTMLElement) {
        const currentPage = document.querySelector('main');
        if (currentPage) {
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
            const target = e.target as HTMLInputElement;
            if (target.checked && target.parentElement?.parentElement!.className === 'filter-list__inner--Category') {
                checkedCategory.category.push(target.id);
            } else if (
                !target.checked &&
                target.parentElement?.parentElement!.className === 'filter-list__inner--Category'
            ) {
                checkedCategory.category = checkedCategory.category.filter((category) => category !== target.id);
            } else if (
                target.checked &&
                target.parentElement?.parentElement!.className === 'filter-list__inner--Brand'
            ) {
                checkedCategory.brand.push(target.id);
            } else if (
                !target.checked &&
                target.parentElement?.parentElement!.className === 'filter-list__inner--Brand'
            ) {
                checkedCategory.brand = checkedCategory.brand.filter((brand) => brand !== target.id);
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
