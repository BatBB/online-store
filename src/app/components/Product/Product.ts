import Component from '../Component';
import IProduct from '../interfaces/IProduct';
import './product.scss';

class Product extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProduct(product: IProduct) {
        this.container.innerHTML = `
        <div class="product-title">Title: ${product.title}</div>
        <div class="product-brand">Brand: ${product.brand}</div>
        <div class="product-price">Price: ${product.price}</div>
        <div class="product-discount">Discount: ${product.discountPercentage}</div>
        <div class="product-rating">Rating: ${product.rating}</div>
        <div class="product-stock">Stock: ${product.stock}</div>
        <div class="product-category">Category: ${product.category}</div>
        `;

        this.container.addEventListener('click', () => {
            console.log('click product');
            window.location.hash = `/products/${product.category}/${product.brand}/${product.title}`;
        });
    }

    render() {
        return this.container;
    }
}

export default Product;
