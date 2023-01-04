import Component from '../../components/Component';
import ProductsList from '../../components/ProductsList/ProductsList';
import Aside from '../../components/Aside/Aside';
import './mainpage.scss';
// import handlerAside from '../../components/Aside/handlerAside';
class MainPage extends Component {
    static productsList = new ProductsList('div', 'products-list');
    private Aside = new Aside('aside', 'aside');
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        this.container.append(this.Aside.render());
        this.container.append(MainPage.productsList.render());
        return this.container;
    }
}

export default MainPage;
