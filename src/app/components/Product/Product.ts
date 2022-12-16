import Component from '../Component';
import './product.scss';

class Product extends Component {
    constructor(
        tagName: string,
        className: string,
        private productName: string,
        private productId: number,
        private productCategory: string,
        private productPrice: number,
        private productDescription: string,
        private productBrand: string,
        private productRating: number,
        private productDiscount: number,
        private productStock: number
    ) {
        super(tagName, className);
        productName;
        productId;
        productCategory;
        productPrice;
        productDescription;
        productBrand;
        productRating;
        productDiscount;
        productStock;
    }

    renderDescriptions() {
        const keys = Object.keys(this).slice(1);
        const names = ['Name', 'Id', 'Category', 'Price', 'Description', 'Brand', 'Rating', 'Discount'];
        console.log(this);

        const data: { [key: string]: any } = this;
        console.log(data);

        data.length = Object.keys(this).slice(1).length;
        const containerDescriptions = document.createElement('ul');

        for (let i = 0; i < data.length - 1; i++) {
            const li = document.createElement('li');
            // console.log(data);
            li.innerHTML = `${names[i]}: ${data[keys[i]]}`;
            containerDescriptions.append(li);
        }
        containerDescriptions.className = 'product-descriptions';
        this.container.append(containerDescriptions);
    }

    render() {
        this.renderDescriptions();
        // this.container.textContent = this.productName;
        // this.container.id = String(this.productId);
        return this.container;
    }
}

export default Product;
