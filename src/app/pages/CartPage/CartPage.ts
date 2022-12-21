import Component from '../../components/Component';
import IProduct from '../../components/interfaces/IProduct';
import createElement from '../../libs/createElement';
import './cartPage.scss';

class CartPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private productsInCartArr = [
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 2,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 1,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 1,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 1,
        },
        {
            product: {
                id: 1,
                title: 'iPhone 9',
                description: 'An apple mobile which is nothing like apple',
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: 'Apple',
                category: 'smartphones',
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                images: [
                    'https://i.dummyjson.com/data/products/1/1.jpg',
                    'https://i.dummyjson.com/data/products/1/2.jpg',
                    'https://i.dummyjson.com/data/products/1/3.jpg',
                    'https://i.dummyjson.com/data/products/1/4.jpg',
                    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
                ],
            },
            count: 3,
        },
    ];

    getTotalPrice = () =>
        this.productsInCartArr.reduce((total: number, item) => {
            let totalTemp = 0;
            for (let i = 0; i < item.count; i++) {
                totalTemp += item.product.price;
            }
            return total + totalTemp;
        }, 0);

    private createProductItem(item: { product: IProduct; count: number }) {
        const productImage = <HTMLImageElement>createElement('img', 'product-image');
        productImage.alt = `Photo ${item.product.title}`;
        productImage.src = item.product.thumbnail;

        const productName = createElement('p', 'product-name');
        productName.textContent = `${item.product.brand} ${item.product.title}`;

        const productPrice = createElement('p', 'product-price');
        productPrice.textContent = `${item.product.price} $`;

        const productContainer = createElement('div', 'products-item');
        productContainer.append(productImage);
        productContainer.append(productName);
        productContainer.append(productPrice);

        const countContainer = createElement('div', 'product-count-container');
        const btnDecrease = createElement('button', 'btn');
        btnDecrease.textContent = '-';
        const productCount = createElement('p', 'product-count');
        productCount.textContent = `${item.count}`;
        const btnIncrement = createElement('button', 'btn');
        btnIncrement.textContent = '+';
        btnDecrease.addEventListener('click', () => {
            let countProd: number = Number(productCount.textContent);
            if (countProd > 1) {
                productCount.textContent = (--countProd).toString();
            }
        });
        btnIncrement.addEventListener('click', () => {
            let countProd: number = Number(productCount.textContent);
            if (countProd < item.product.stock) {
                productCount.textContent = (++countProd).toString();
            }
        });
        countContainer.append(btnDecrease);
        countContainer.append(productCount);
        countContainer.append(btnIncrement);
        productContainer.append(countContainer);

        const btnDel = createElement('button', 'btn btn-delete');
        btnDel.textContent = 'X';
        btnDel.addEventListener('click', (ev: Event) => {
            (<HTMLElement>ev.target).parentElement?.remove();
            console.log('delete product item');
        });
        productContainer.append(btnDel);

        return productContainer;
    }

    private renderShop() {
        const productsListColumn = createElement('div', 'products-list-container');
        this.productsInCartArr.forEach((item) => {
            const productItem = this.createProductItem(item);
            productsListColumn.append(productItem);
        });
        this.container.append(productsListColumn);
    }

    private renderOrder() {
        const orderBlock = createElement('div', 'cart__order');

        const orderTitle = createElement('p', 'order__title');
        orderTitle.textContent = 'Order Summary';

        const orderPromo = createElement('div', 'order__promo');
        const inputPromo = createElement('input', 'order__promo-input');
        const btnPromo = createElement('button', 'order__promo-btn');
        btnPromo.textContent = 'Apply';
        orderPromo.append(inputPromo);
        orderPromo.append(btnPromo);

        const totalBlock = createElement('div', 'order-total');
        totalBlock.textContent = `Total: ${this.getTotalPrice()}`;

        orderBlock.append(orderTitle);
        orderBlock.append(orderPromo);
        orderBlock.append(totalBlock);

        this.container.append(orderBlock);
    }

    render() {
        this.renderShop();
        this.renderOrder();
        return this.container;
    }
}

export default CartPage;
