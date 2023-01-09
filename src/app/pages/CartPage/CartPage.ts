import Component from '../../components/Component';
import ICartData from '../../components/interfaces/ICartData';
import ModalOrdering from '../../components/ModalOrdering/ModalPay';
import createElement from '../../libs/createElement';
import {
    setProductInCartLocalStorage,
    getDataInLocalStorage,
    delProductInCartLocalStorage,
} from '../../libs/productInCartLocalStorage';
import svgImages from '../../libs/svgImages';
import './cartPage.scss';

class CartPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private textEmptyCart = `<p class="cart__empty-text">Cart is empty!</p>`;

    static totalCountProduct = () => {
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
        const productNumber = createElement('div', 'cart__product-number');
        const number = <number>getDataInLocalStorage()?.findIndex((prod) => prod.product.id === item.product.id) + 1;
        productNumber.textContent = `${number}`;

        const productImage = <HTMLImageElement>createElement('img', 'cart__product-image');
        productImage.alt = `Photo ${item.product.title}`;
        productImage.src = item.product.thumbnail;

        const productImageContainer = createElement('div', 'cart__product-image-container');
        productImageContainer.append(productImage);

        const productTitle = createElement('p', 'cart__product-title');
        productTitle.textContent = `${item.product.brand} ${item.product.title}`;

        const productPrice = createElement('p', 'cart__product-price');
        productPrice.textContent = `${item.product.price} $`;

        const productContainer = createElement('div', 'cart__products-item');
        productContainer.append(productNumber);
        productContainer.append(productImageContainer);

        const productStock = createElement('p', 'cart__product-stock');
        productStock.textContent = `Stock: ${item.product.stock}`;

        const countContainer = createElement('div', 'cart__product-count-container');
        const countBlock = createElement('div', 'cart__product-count-block');
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
            setProductInCartLocalStorage(item.product, 0);
            CartPage.updateTotalPrice();
        });
        btnIncrement.addEventListener('click', () => {
            let countProd: number = Number(productCount.textContent);
            if (countProd < item.product.stock) {
                productCount.textContent = (++countProd).toString();
            }
            setProductInCartLocalStorage(item.product, 1);
            CartPage.updateTotalPrice();
        });
        countBlock.append(btnDecrease);
        countBlock.append(productCount);
        countBlock.append(btnIncrement);
        countContainer.append(countBlock);
        countContainer.append(productStock);

        const productDescContainer = createElement('div', 'cart__product-desc');
        productDescContainer.append(productTitle);
        productDescContainer.append(productPrice);
        productDescContainer.append(countContainer);

        productContainer.append(productDescContainer);

        const btnDel = createElement('button', 'cart__btn cart__btn-delete');
        btnDel.innerHTML = svgImages.close;
        btnDel.addEventListener('click', () => {
            this.deleteProd(item);
        });
        productContainer.append(btnDel);

        return productContainer;
    }

    private deleteProd(item: ICartData) {
        const productContainer = document.querySelector('.cart__products-list-container');
        const data = getDataInLocalStorage();
        if (data !== null) {
            delProductInCartLocalStorage(item.product.id);
            CartPage.updateTotalPrice();
            if (data.length === 1) {
                const cartPage = document.querySelector('.cart-page');
                if (cartPage) cartPage.innerHTML = this.textEmptyCart;
            }
        }

        if (productContainer && getDataInLocalStorage()?.length) {
            productContainer.innerHTML = '';
            this.renderShop();
        }
    }

    private clickBtnPage(paginationContainer: HTMLElement) {
        const buttonsPage = paginationContainer.querySelectorAll('.cart__pagination-page-btn');
        buttonsPage.forEach((btn) => {
            btn.addEventListener('click', (ev: Event) => {
                const target = <HTMLElement>ev.target;
                const countTitle = paginationContainer.querySelector('.cart__pagination-page-title');
                const maxPage = 3;
                if (countTitle) {
                    const count = Number(countTitle.textContent);
                    if (target.className.includes('next')) {
                        if (count < maxPage) countTitle.textContent = `${count + 1}`;
                    } else {
                        if (count > 1) countTitle.textContent = `${count - 1}`;
                    }
                }
            });
        });
    }

    private changeCount(paginationContainer: HTMLElement) {
        const countInput = <HTMLInputElement>paginationContainer.querySelector('.cart__pagination-count-input');
        if (countInput) {
            countInput.addEventListener('change', () => {});
        }
    }

    private renderShop() {
        let productsListColumn = document.querySelector('.cart__products-list-container');

        if (!productsListColumn) {
            productsListColumn = createElement('div', 'cart__products-list-container');
            this.container.append(productsListColumn);
        }

        const paginationContainer = createElement('div', 'cart__pagination');
        const paginationContainerTemplate = `
        <div class="cart__pagination-count">
            <span class="cart__pagination-count-title">Limit: </span>
            <input class="cart__pagination-count-input" type="number" min="1" value="1"/>
        </div>
        <div class="cart__pagination-page">
            <span class="cart__pagination-page-text">Page: </span>
            <button class="cart__pagination-page-btn cart__pagination-page-prev cart__btn"><</button>
            <span class="cart__pagination-page-title">1</span>
            <button class="cart__pagination-page-btn cart__pagination-page-next cart__btn">></button>
        </div>`;
        paginationContainer.innerHTML = paginationContainerTemplate;
        this.clickBtnPage(paginationContainer);
        this.changeCount(paginationContainer);

        productsListColumn.append(paginationContainer);

        const data = getDataInLocalStorage();

        if (data !== null && data.length) {
            data.forEach((item) => {
                const productItem = this.createProductItem(item);
                if (productsListColumn) productsListColumn.append(productItem);
            });
        }
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
            ModalOrdering.openModalPay();
        });

        orderBlock.append(orderTitle);
        orderBlock.append(orderPromo);
        orderBlock.append(totalBlock);
        orderBlock.append(btnBuy);

        this.container.append(orderBlock);
    }

    render() {
        if (getDataInLocalStorage()?.length) {
            this.renderShop();
            this.renderOrder();
        } else {
            this.container.innerHTML = this.textEmptyCart;
        }
        return this.container;
    }
}

export default CartPage;
