import createElement from '../../libs/createElement';
import Component from '../Component';
import Header from '../Header/Header';
import ICartData from '../interfaces/ICartData';
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
            console.log('Add to cart');

            const productsInCart = localStorage.getItem('productsInCart');
            if (productsInCart !== null) {
                const products: ICartData[] = <ICartData[]>JSON.parse(productsInCart);

                const indexProd = products.findIndex((prod) => prod.product.id === productData.id);
                if (indexProd === -1) {
                    products.push({
                        product: productData,
                        count: 1,
                    });
                } else {
                    if (products[indexProd].count < productData.stock) products[indexProd].count++;
                }
                localStorage.setItem('productsInCart', JSON.stringify(products));
            } else {
                console.log('create array with product and count');
                const prod: ICartData[] = [
                    {
                        product: productData,
                        count: 1,
                    },
                ];
                localStorage.setItem('productsInCart', JSON.stringify(prod));
            }
            Header.updateCountProduct();
        });

        const btnBuy = createElement('button', 'product-btn-add');
        btnBuy.textContent = 'Buy now';
        btnBuy.addEventListener('click', () => {
            console.log('Buy now');
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
