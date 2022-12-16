import Component from '../Component';
import IProduct from './../interfaces/IProduct';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProduct(products: IProduct[]) {
        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.textContent = product.title;
            this.container.append(productCard);
        });
    }

    render() {
        // this.renderProduct();
        return this.container;
    }
}

export default ProductsList;
