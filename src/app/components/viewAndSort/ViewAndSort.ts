import svgImages from '../../libs/svgImages';
import Component from '../Component';

class ViewAndSort extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private renderViewAndSort() {
        const viewAndSortContainerTemplate = `
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

        this.container.innerHTML = viewAndSortContainerTemplate;

        //
        // return viewAndCountContainer;
    }

    render() {
        this.renderViewAndSort();
        return this.container;
    }
}

export default ViewAndSort;
