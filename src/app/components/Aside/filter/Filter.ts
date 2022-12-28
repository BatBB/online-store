import Component from '../../Component';
import Loader from '../../../loader/Loader';
import './filter.scss';

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
                        <input type="checkbox" id="${name}" class="checkbox-item">
                        <label for="${name}">${name}</label>
                        `;
                    filterListInner.append(filterContainer);
                }
                this.container.append(filterListInner);
                i++;
            }

            this.renderRangeFilter();
            this.rangeFilterLogic();
        } catch (err) {
            console.log(err);
        }
    }

    renderRangeFilter() {
        const rangeContainer = document.createElement('div');
        rangeContainer.className = 'range_container';

        rangeContainer.innerHTML = `
        <button class="button reset-button">Reset</button>
        <button class="button copy-button">Copylink</button>
        <h3 class="filter__header">Price</h3>
        <div class="multi-range-desc">
            <span class="lower-price">0</span>
            <span class="upper-price">0</span>
        </div>
        <span class="multi-range">
            <input type="range" min="10" max="1749" value="10" id="lower-price">
            <input type="range" min="10" max="1749" value="1749" id="upper-price">
        </span>

        <h3 class="filter__header">Stock</h3>
        <div class="multi-range-desc">
            <span class="lower-stock">0</span>
            <span class="upper-stock">0</span>
        </div>
        <span class="multi-range">
            <input type="range" min="0" max="150" value="10" id="lower-stock">
            <input type="range" min="0" max="150" value="150" id="upper-stock">
        </span>
        `;

        this.container.append(rangeContainer);
    }

    rangeFilterLogic() {
        // Price
        const lowerPriceSlider = document.querySelector('#lower-price') as HTMLInputElement;
        const lowerPrice = document.querySelector('.lower-price');
        const upperPriceSlider = document.querySelector('#upper-price') as HTMLInputElement;
        const upperPrice = document.querySelector('.upper-price');

        lowerPrice!.innerHTML = lowerPriceSlider.value + ' €';
        upperPrice!.innerHTML = upperPriceSlider.value + ' €';
        let lowerVal = parseInt(lowerPriceSlider.value);
        let upperVal = parseInt(upperPriceSlider.value);

        upperPriceSlider.oninput = function () {
            lowerVal = parseInt(lowerPriceSlider.value);
            upperVal = parseInt(upperPriceSlider.value);
            upperPrice!.innerHTML = String(upperVal) + ' €';

            if (upperVal < lowerVal + 4) {
                lowerPriceSlider.value = String(upperVal - 4);
                lowerPrice!.innerHTML = String(upperVal) + '€';

                if (String(lowerVal) == lowerPriceSlider.min) {
                    upperPriceSlider.value = String(4);
                    lowerPrice!.innerHTML = String(upperVal) + ' €';
                }
            }
        };
        lowerPriceSlider.oninput = function () {
            lowerVal = parseInt(lowerPriceSlider.value);
            upperVal = parseInt(upperPriceSlider.value);
            lowerPrice!.innerHTML = String(lowerVal) + ' €';

            if (lowerVal > upperVal - 4) {
                upperPriceSlider.value = String(lowerVal + 4);
                upperPrice!.innerHTML = String(upperVal) + ' €';

                if (String(upperVal) == upperPriceSlider.max) {
                    lowerPriceSlider.value = String(parseInt(upperPriceSlider.max) - 4);
                    upperPrice!.innerHTML = String(upperVal) + ' €';
                }
            }
        };

        // Stock
        const lowerStockSlider = document.querySelector('#lower-stock') as HTMLInputElement;
        const lowerStock = document.querySelector('.lower-stock');
        const upperStockSlider = document.querySelector('#upper-stock') as HTMLInputElement;
        const upperStock = document.querySelector('.upper-stock');

        lowerStock!.innerHTML = lowerStockSlider.value;
        upperStock!.innerHTML = upperStockSlider.value;
        let lowerValStock = parseInt(lowerStockSlider.value);
        let upperValStock = parseInt(upperStockSlider.value);

        upperStockSlider.oninput = function () {
            lowerValStock = parseInt(lowerStockSlider.value);
            upperValStock = parseInt(upperStockSlider.value);
            upperStock!.innerHTML = String(upperValStock);

            if (upperValStock < lowerValStock + 4) {
                lowerStockSlider.value = String(upperValStock - 4);
                lowerStock!.innerHTML = String(upperValStock);

                if (String(lowerValStock) == lowerStockSlider.min) {
                    upperStockSlider.value = String(4);
                    lowerStock!.innerHTML = String(upperValStock);
                }
            }
        };
        lowerStockSlider.oninput = function () {
            lowerValStock = parseInt(lowerStockSlider.value);
            upperValStock = parseInt(upperStockSlider.value);
            lowerStock!.innerHTML = String(lowerValStock);

            if (lowerValStock > upperValStock - 4) {
                upperStockSlider.value = String(lowerValStock + 4);
                upperStock!.innerHTML = String(upperValStock);

                if (String(upperValStock) == upperStockSlider.max) {
                    lowerStockSlider.value = String(parseInt(upperStockSlider.max) - 4);
                    upperStock!.innerHTML = String(upperValStock);
                }
            }
        };
    }

    render() {
        void this.renderFilter();
        return this.container;
    }
}

export default Filter;
