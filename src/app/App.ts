import Header from './components/Header/Header';
import '../global.scss';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';

let checkedCategory: string[] = [];

class App {
    private container: HTMLElement;
    header = new Header('header', 'header');
    main = new MainPage('main', 'main');
    footer = new Footer('footer', 'footer');

    constructor() {
        this.container = document.body;
    }

    listenerAside() {
        const filterContainer = document.querySelector('.filter_list');

        filterContainer?.addEventListener('change', (e: Event) => {
            const target: any = e.target;
            if (target.checked) {
                checkedCategory.push(target.id);
            } else if (!target.checked) {
                checkedCategory = checkedCategory.filter((category) => category !== target.id)
            }
            this.main.render();
        });
        
        return checkedCategory;
    }

    run() {
        this.container.append(this.header.render());
        this.container.append(this.main.render());
        this.container.append(this.footer.render());

        this.listenerAside();

    }
}

export { App, checkedCategory };
