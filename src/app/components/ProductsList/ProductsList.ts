import Component from '../Component';
import Product from '../Product/Product';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProduct(): void {
        const products: Product[] = [];
        for (let i = 0; i < 10; i++) {
            products.push(new Product('div', 'product-item', `Product ${i}`, `id${i}`));
            console.log(products[i]);

            this.container.append(products[i].render());
        }
    }

    render() {
        this.renderProduct();
        return this.container;
    }
}

export default ProductsList;
