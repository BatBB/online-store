import Component from "../Component";
import Filter from "./filter/Filter";

class Aside extends Component {
    private filterBlock = new Filter('div', 'filter_list').render();
    constructor(tagName: string, className: string) {
        super(tagName, className)
    }


    render() {
        this.container.append(this.filterBlock)
        this.container.className = this.container.className;
        return this.container;
    }
}

export default Aside;