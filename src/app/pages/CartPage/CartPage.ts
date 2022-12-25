import Component from '../../components/Component';
import ICartData from '../../components/interfaces/ICartData';
import createElement from '../../libs/createElement';
import {
    setProductInCartLocalStorage,
    getDataInLocalStorage,
    delProductInCartLocalStorage,
} from '../../libs/productInCartLocalStorage';
import './cartPage.scss';

class CartPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private static totalCountProduct = () => {
        let total = 0;
        const data = getDataInLocalStorage();
        if (data !== null) {
            total = data.reduce((sum: number, item) => {
                let sumTemp = 0;
                for (let i = 0; i < item.count; i++) {
                    sumTemp += item.product.price;
                }
                return sum + sumTemp;
            }, 0);
        }
        return total;
    };

    static updateTotalPrice = () => {
        const totalContainer = document.querySelector('.order__total');

        if (totalContainer) totalContainer.textContent = this.totalCountProduct().toString();
    };

    private createProductItem(item: ICartData) {
        const productImage = <HTMLImageElement>createElement('img', 'cart__product-image');
        productImage.alt = `Photo ${item.product.title}`;
        productImage.src = item.product.thumbnail;

        const productImageContainer = createElement('div', 'cart__product-image-container');
        productImageContainer.append(productImage);

        const productName = createElement('p', 'cart__product-name');
        productName.textContent = `${item.product.brand} ${item.product.title}`;

        const productPrice = createElement('p', 'cart__product-price');
        productPrice.textContent = `${item.product.price} $`;

        const productContainer = createElement('div', 'cart__products-item');
        productContainer.append(productImageContainer);
        productContainer.append(productName);
        productContainer.append(productPrice);

        const countContainer = createElement('div', 'cart__product-count-container');
        const btnDecrease = createElement('button', 'cart__btn');
        btnDecrease.textContent = '-';
        const productCount = createElement('p', 'cart__product-count');
        productCount.textContent = `${item.count}`;
        const btnIncrement = createElement('button', 'cart__btn');
        btnIncrement.textContent = '+';
        btnDecrease.addEventListener('click', () => {
            let countProd: number = Number(productCount.textContent);
            if (countProd > 1) {
                productCount.textContent = (--countProd).toString();
            }
            setProductInCartLocalStorage(item.product, false);
            CartPage.updateTotalPrice();
        });
        btnIncrement.addEventListener('click', () => {
            let countProd: number = Number(productCount.textContent);
            if (countProd < item.product.stock) {
                productCount.textContent = (++countProd).toString();
            }
            setProductInCartLocalStorage(item.product, true);
            CartPage.updateTotalPrice();
        });
        countContainer.append(btnDecrease);
        countContainer.append(productCount);
        countContainer.append(btnIncrement);
        productContainer.append(countContainer);

        const btnDel = createElement('button', 'cart__btn cart__btn-delete');
        btnDel.textContent = 'X';
        btnDel.addEventListener('click', (ev: Event) => {
            (<HTMLElement>ev.target).parentElement?.remove();
            console.log('delete product item');
            const data = getDataInLocalStorage();
            if (data !== null) {
                delProductInCartLocalStorage(item.product.id);
                CartPage.updateTotalPrice();
            }
        });
        productContainer.append(btnDel);

        return productContainer;
    }

    private renderShop() {
        const productsListColumn = createElement('div', 'cart__products-list-container');
        const data = getDataInLocalStorage();
        if (data !== null) {
            data.forEach((item) => {
                const productItem = this.createProductItem(item);
                productsListColumn.append(productItem);
            });
        }
        this.container.append(productsListColumn);
    }

    private renderOrder() {
        const orderBlock = createElement('div', 'cart__order order');

        const orderTitle = createElement('p', 'order__title');
        orderTitle.textContent = 'Order Summary';

        const orderPromo = createElement('div', 'order__promo');
        const inputPromo = createElement('input', 'order__promo-input');
        const btnPromo = createElement('button', 'order__promo-btn');
        btnPromo.textContent = 'Apply';
        orderPromo.append(inputPromo);
        orderPromo.append(btnPromo);

        const totalBlock = createElement('p', 'order__total-title');
        totalBlock.innerHTML = `Total: <span class="order__total">${CartPage.totalCountProduct()}</span> $`;

        const btnBuy = createElement('button', 'order__buy-btn');
        btnBuy.textContent = 'Buy now';
        btnBuy.addEventListener('click', () => {
            alert('Good');
        });

        orderBlock.append(orderTitle);
        orderBlock.append(orderPromo);
        orderBlock.append(totalBlock);
        orderBlock.append(btnBuy);

        this.container.append(orderBlock);
    }

    render() {
        this.renderShop();
        this.renderOrder();
        return this.container;
    }
}

export default CartPage;
