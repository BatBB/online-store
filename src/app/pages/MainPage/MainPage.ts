import Component from '../../components/Component';
import ProductsList from '../../components/ProductsList/ProductsList';
import Aside from '../../components/Aside/Aside';
import ViewAndSort from '../../components/viewAndSort/ViewAndSort';
import createElement from '../../libs/createElement';
import userQuery from '../../libs/userQuery';
import './mainpage.scss';

class MainPage extends Component {
    static productsList = new ProductsList('div', 'main__products-list-container');
    private Aside = new Aside('aside', 'main__aside');
    private ViewAndSortComponent = new ViewAndSort('div', 'main__view-sort-container');
    private mainContainer = createElement('div', 'main__container');

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    setURLPagination(param: 'page' | 'count', value: string) {
        userQuery[param] = value;
        userQuery.userParams?.searchParams.set(param, value);
        if (userQuery.userParams?.search.toString() === '') {
            history.pushState({}, '', '/');
        } else {
            history.pushState({}, '', userQuery.userParams?.search);
        }
    }

    clickMainContainer() {
        this.container.addEventListener('click', (ev: Event) => {
            const target = <HTMLElement>ev.target;

            if (target.classList.contains('main__view-count-item')) {
                const countItem = this.container.querySelectorAll('.main__view-count-item');
                countItem.forEach((item) => item.classList.remove('checked'));
                target.classList.add('checked');
                this.setURLPagination('count', target.textContent || '10');
                MainPage.productsList.render();
            } else if (target.classList.contains('main__pagination-numbers-item')) {
                const paginationPageNumberItems = this.container.querySelectorAll('.main__pagination-numbers-item');

                paginationPageNumberItems.forEach((item) => item.classList.remove('checked'));
                target.classList.add('checked');
                this.setURLPagination('page', target.textContent || '1');
                MainPage.productsList.render();
            }
        });
    }

    renderMain() {}

    render() {
        this.container.append(this.Aside.render());
        this.mainContainer.append(this.ViewAndSortComponent.render());
        this.mainContainer.append(MainPage.productsList.render());
        this.mainContainer.append(createElement('div', 'main__pagination-numbers'));
        this.container.append(this.mainContainer);
        this.clickMainContainer();
        return this.container;
    }
}

export default MainPage;
