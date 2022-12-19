import Component from '../Component';
import IProduct from '../interfaces/IProduct';
import './product.scss';

class Product extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProduct(productData: IProduct) {
        this.container.innerHTML = `
        <div class="product-title">Title: ${productData.title}</div>
        <div class="product-brand">Brand: ${productData.brand}</div>
        <div class="product-price">Price: ${productData.price}</div>
        <div class="product-discount">Discount: ${productData.discountPercentage}</div>
        <div class="product-rating">Rating: ${productData.rating}</div>
        <div class="product-stock">Stock: ${productData.stock}</div>
        <div class="product-category">Category: ${productData.category}</div>
        `;

        this.container.addEventListener('click', () => {
            localStorage.setItem('productDataInLocalStorage', JSON.stringify(productData));
            window.location.hash = `/product/${productData.id}`;
        });
    }

    render() {
        return this.container;
    }
}

export default Product;
