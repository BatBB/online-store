import Component from "../../Component";
import Loader from "../../../loader/Loader";

class Filter extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    async renderFilter() {

        const loader = new Loader().fetchData();
        const data = await loader;
        const allCategory: string[] | undefined = data?.map((product) => product.category);
        const uniqueCategory: Set<string> | undefined = new Set(allCategory);

        for (let category of uniqueCategory) {
            const container = document.createElement('div');
            container.className = 'checkbox-line';

            container.innerHTML = `
            <input type="checkbox" id="${category}">
            <label for="${category}">${category}</label>
            <div class="count_items">Count</div>
            `;

            this.container.append(container);
        }

    }

    render() {
        this.renderFilter();
        return this.container;
    }
}

export default Filter