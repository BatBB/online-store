import Component from '../../Component';
import Loader from '../../../loader/Loader';

class Filter extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    async renderFilter() {
        try {
            const loader = new Loader().fetchData();
            const data = await loader;
            const allCategory: Set<string> | undefined = new Set(data?.map((product) => product.category));
            const allBrand: Set<string> | undefined = new Set(data?.map((product) => product.brand));
            const filterNames = [allCategory, allBrand];

            let i = 0;
            for (const item of filterNames) {
                const filterListInner = document.createElement('div');
                filterListInner.className = 'filter-list__inner';
                const header = document.createElement('h3');
                header.className = 'filter__header';
                if (i == 0) {
                    header.textContent = 'Category';
                    filterListInner.className = 'filter-list__inner--Category';
                } else if (i == 1) {
                    header.textContent = 'Brand';
                    filterListInner.className = 'filter-list__inner--Brand';
                }
                filterListInner.append(header);

                for (const name of item) {
                    const filterContainer = document.createElement('div');
                    filterContainer.className = 'checkbox-line';
                    filterContainer.innerHTML = `
                        <input type="checkbox" id="${name}">
                        <label for="${name}">${name}</label>
                        `;
                    filterListInner.append(filterContainer);
                }
                this.container.append(filterListInner);
                i++;
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        void this.renderFilter();
        return this.container;
    }
}

export default Filter;
