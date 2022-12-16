import Component from '../Component';
import IProduct from '../interfaces/IProduct';

class Product extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProduct(product: IProduct) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
        <div class="product-title">${product.title}</div>
        <div class="product-brand">${product.brand}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-discount">${product.discountPercentage}</div>
        <div class="product-rating">${product.rating}</div>
        <div class="product-stock">${product.stock}</div>
        <div class="product-category">${product.category}</div>
        `;
        this.container.append(productItem);
    }

    render() {
        // this.container.textContent = this.productName;
        // this.container.id = this.productId;
        return this.container;
    }
}

export default Product;
