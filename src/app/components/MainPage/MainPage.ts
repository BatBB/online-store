import Component from '../Component';
import ProductsList from '../ProductsList/ProductsList';
import Aside from '../Aside/Aside';
import './MainPage.scss';

class MainPage extends Component {
    private productsList = new ProductsList('div', 'products-list');
    private aside = new Aside('aside', 'aside');
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        this.container.append(this.productsList.render());
        this.container.append(this.aside.render());
        return this.container;
    }
}

export default MainPage;
