import Component from '../Component';
import ProductsList from '../../loader/ProductsList/ProductsList';
import Aside from '../Aside/Aside';
import { checkedCategory } from '../../App';

import './MainPage.scss';

class MainPage extends Component {

    private aside = new Aside('aside', 'aside');
    private productsList = new ProductsList('div', 'products-list');
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        this.container.append(this.aside.render());
        this.container.append(this.productsList.render());
        return this.container;
    }
}

export default MainPage;
