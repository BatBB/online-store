import Component from '../Component';

class Product extends Component {
    constructor(tagName: string, className: string, private productName: string, private productId: string) {
        super(tagName, className);
        productName;
        productId;
    }

    render() {
        this.container.textContent = this.productName;
        this.container.id = this.productId;
        return this.container;
    }
}

export default Product;
