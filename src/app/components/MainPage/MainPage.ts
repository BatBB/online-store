import Component from '../Component';
import ProductsList from '../ProductsList/ProductsList';

class MainPage extends Component {
    private productsList = new ProductsList('div', 'products-list');
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        this.container.append(this.productsList.render());
        return this.container;
    }
}

export default MainPage;
