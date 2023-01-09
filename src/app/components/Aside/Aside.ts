import Component from '../Component';
import Filter from './Filter/filter';

class Aside extends Component {
    private filterBlock = new Filter('div', 'filter_list').render();
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        this.container.append(this.filterBlock);
        return this.container;
    }
}

export default Aside;
