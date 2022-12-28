import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import handlerAside from './components/Aside/handlerAside';
// import ProductPage from './components/ProductPage/ProductPage';
type UserQueryType = {
    userParams?: URL;
    category: Array<string>;
    brand: Array<string>;
    price: {
        min: number | null;
        max: number | null;
    };
    stock: {
        min: number | null;
        max: number | null;
    };
};

const userQuery: UserQueryType = {
    userParams: new URL(window.location.href),
    category: [],
    brand: [],
    price: {
        min: 10,
        max: 1749,
    },
    stock: {
        min: 10,
        max: 150,
    },
};

class App {
    // private URLQuery: string;
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
        handlerAside();
    }
    // private static globalHandler() {

    //     function filterButtonHandler() {
    //         function resetButton() {
    //             const resetButton = document.querySelector('.reset-button');
    //             console.log(resetButton);
    //             resetButton?.addEventListener('click', () => {
    //                 userQuery.userParams = new URL(window.location.href);
    //                 userQuery.brand = [];
    //                 userQuery.category = [];
    //                 userQuery.price = {
    //                     min: 10,
    //                     max: 1749,
    //                 };
    //                 userQuery.stock = {
    //                     min: 10,
    //                     max: 150,
    //                 };

    //                 history.pushState({}, '', '/');
    //                 console.log(true);
    //             });

    //             resetButton?.addEventListener('click', () => {
    //                 const checkboxItem = document.querySelectorAll('.checkbox-item') as unknown as HTMLInputElement[];
    //                 for (const item of checkboxItem) {
    //                     item.checked = false;
    //                 }

    //                 App.mainPage.render();
    //             });
    //         }

    //         function copyButton() {
    //             const copyButton = document.querySelector('.copy-button');
    //             copyButton?.addEventListener('click', () => {
    //                 void window.navigator.clipboard.writeText(window.location.href);
    //                 console.log(true);
    //             });
    //         }
    //         resetButton();
    //         copyButton();
    //     }
    //     filterButtonHandler();
    // }
    run() {
        this.container.append(this.header.render());
        this.container.append(App.mainPage.render());
        this.container.append(this.footer.render());
        App.listenerAside();
        // App.globalHandler();
    }
}

export { App, userQuery };
