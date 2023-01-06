import Component from '../../components/Component';
import ProductsList from '../../components/ProductsList/ProductsList';
import Aside from '../../components/Aside/Aside';
import './mainpage.scss';
import createElement from '../../libs/createElement';
import svgImages from '../../libs/svgImages';
// import handlerAside from '../../components/Aside/handlerAside';
class MainPage extends Component {
    static productsList = new ProductsList('div', 'main__products-list');
    private Aside = new Aside('aside', 'main__aside');

    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private renderViewAndSort() {
        const viewAndCountContainer = createElement('div', 'main__view-sort-container');

        const viewContainerTemplate = `
        <div class="main__sort">
            <span class="main__sort-title">Sort: </span>
            <select class="main__sort-list" name="sort-select">
                <option class="main__sort-item" value="sort-recommended" selected>Recommended</option>
                <option class="main__sort-item" value="sort-price-low">Price: low to high</option>
                <option class="main__sort-item" value="sort-price-high">Price: high to low</option>
                <option class="main__sort-item" value="sort-rate-low">Rate: low to high</option>
                <option class="main__sort-item" value="sort-rate-high">Rate: high to low</option>
            </select>
        </div>
        <div class="main__view">
            <div class="main__view-count">
                <ul class="main__view-count-list">
                    <li class="main__view-count-item checked">10</li>
                    <li class="main__view-count-item">50</li>
                    <li class="main__view-count-item">100</li>
                </ul>
            </div>
            <div class="main__view-container">
                <ul class="main__view-list">
                    <li class="main__view-item">${svgImages.list}</li>
                    <li class="main__view-item checked">${svgImages.card}</li>
                </ul>
            </div>
        </div>`;

        viewAndCountContainer.innerHTML = viewContainerTemplate;

        const countView = viewAndCountContainer.querySelector('.main__view-count-list');

        countView?.addEventListener('click', (ev: Event) => {
            const target = <HTMLElement>ev.target;
            if (target.classList.contains('main__view-count-item')) {
                const countItem = viewAndCountContainer.querySelectorAll('.main__view-count-item');
                countItem.forEach((item) => item.classList.remove('checked'));
                target.classList.add('checked');
            }
        });
        return viewAndCountContainer;
    }

    private renderPaginationPageNumbers(countPages: number) {
        const paginationPageNumber = createElement('div', 'main__pagination-numbers');
        const paginationPageNumberList = createElement('ul', 'main__pagination-numbers-list');
        for (let i = 1; i <= countPages; i++) {
            const paginationPageNumberItem = createElement('li', 'main__pagination-numbers-item');
            paginationPageNumberItem.textContent = i.toString();
            paginationPageNumberList.append(paginationPageNumberItem);
        }
        paginationPageNumber.append(paginationPageNumberList);
        return paginationPageNumber;
    }

    private renderMain() {
        const mainContainer = createElement('div', 'main__container');
        mainContainer.append(this.renderViewAndSort());
        mainContainer.append(MainPage.productsList.render());
        mainContainer.append(this.renderPaginationPageNumbers(10));
        return mainContainer;
    }

    render() {
        this.container.append(this.Aside.render());
        this.container.append(this.renderMain());
        return this.container;
    }
}

export default MainPage;
