import createElement from '../../libs/createElement';
import { setProductInCartLocalStorage } from '../../libs/productInCartLocalStorage';
import Component from '../Component';
import IProduct from '../interfaces/IProduct';
import './product.scss';

class Product extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProduct(productData: IProduct) {
        const productDesc = createElement('div', 'product-desc');
        productDesc.innerHTML = `
        <div class="product-image">
            <img class="product-img" src=${productData.thumbnail} alt="photo ${productData.title}">
        </div>
        <p class="product-title">${productData.brand} ${productData.title}</p>
        <p class="product-rating">Rating: ${productData.rating}</p>
        <p class="product-price">${productData.price} $</p>
        <p class="product-stock">Stock: ${productData.stock}</p>        
        `;

        productDesc.addEventListener('click', () => {
            localStorage.setItem('productDataInLocalStorage', JSON.stringify(productData));
            window.location.hash = `/product/${productData.id}`;
        });

        const btnAdd = createElement('button', 'product-btn-add');
        btnAdd.textContent = 'Add to cart';
        btnAdd.addEventListener('click', () => {
            setProductInCartLocalStorage(productData, 1);
        });

        const btnBuy = createElement('button', 'product-btn-add');
        btnBuy.textContent = 'Buy now';
        btnBuy.addEventListener('click', () => {
            setProductInCartLocalStorage(productData, 1);
            window.location.hash = '/cart';
        });

        const btnContainer = createElement('div', 'product-btn');
        btnContainer.append(btnAdd);
        btnContainer.append(btnBuy);

        this.container.append(productDesc);
        this.container.append(btnContainer);
    }

    render() {
        return this.container;
    }
}

export default Product;
