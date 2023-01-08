import Component from '../../components/Component';
import IProduct from '../../components/interfaces/IProduct';
import createElement from '../../libs/createElement';
import './productPage.scss';

class ProductPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private renderNavigationLinks(productData: IProduct) {
        const navigationLinksContainer = createElement('div', 'product-page__links');

        const linkTemplate = `
        <ul class="product-page__links-list">
            <li class="product-page__links-item"><a class="product-page__links-link" href="#">Main page</a></li>
            <li class="product-page__links-item">></li>
            <li class="product-page__links-item">${productData.category}</li>
            <li class="product-page__links-item">></li>
            <li class="product-page__links-item">${productData.brand}</li>
            <li class="product-page__links-item">></li>
            <li class="product-page__links-item">${productData.title}</li>
        </ul>`;

        navigationLinksContainer.innerHTML = linkTemplate;
        this.container.append(navigationLinksContainer);
    }

    private renderProductImages(images: string[], title: string) {
        const productImagesContainer = createElement('div', 'product-page__image-container');

        const productImageMain = createElement('div', 'product-page__image-main');
        const imageMain = document.createElement('img');
        imageMain.className = 'image';
        imageMain.src = images[0];
        imageMain.alt = `Photo ${title}`;
        productImageMain.append(imageMain);

        const productImageSwiper = createElement('div', 'product-page__image-swiper');
        images.forEach((img) => {
            const imageSwiper = document.createElement('img');
            imageSwiper.className = 'image';
            imageSwiper.src = img;
            imageSwiper.alt = `Photo ${title}`;
            imageSwiper.addEventListener('click', () => {
                imageMain.src = img;
            });

            productImageSwiper.append(imageSwiper);
        });
        productImagesContainer.append(productImageSwiper);
        productImagesContainer.append(productImageMain);

        return productImagesContainer;
    }

    private renderProductDesc(productData: IProduct) {
        const productContainer = createElement('div', 'product-page__desc-container');

        const productName = createElement('h3', 'product-page__name');
        productName.textContent = `${productData.brand} ${productData.title}`;
        productContainer.append(productName);

        const productRating = createElement('p', 'product-page__rating');
        productRating.textContent = `Rating: ${productData.rating} out of 5`;
        productContainer.append(productRating);

        const productPrice = createElement('p', 'product-page__price');
        productPrice.textContent = `${productData.price} $`;
        productContainer.append(productPrice);

        const productStock = createElement('p', 'product-page__stock');
        productStock.textContent = `Stock: ${productData.stock}`;

        const countContainer = createElement('div', 'product-page__count');
        const btnDecrease = createElement('button', 'product-page__count-btn');
        btnDecrease.textContent = '-';
        const productCount = createElement('p', 'product-page__count-text');
        productCount.textContent = '' || '1';
        const btnIncrement = createElement('button', 'product-page__count-btn');
        btnIncrement.textContent = '+';
        btnDecrease.addEventListener('click', () => {
            let countProd: number = Number(productCount.textContent);
            if (countProd > 1) {
                productCount.textContent = (--countProd).toString();
            }
        });
        btnIncrement.addEventListener('click', () => {
            let countProd: number = Number(productCount.textContent);
            if (countProd < productData.stock) {
                productCount.textContent = (++countProd).toString();
            }
        });

        countContainer.append(btnDecrease);
        countContainer.append(productCount);
        countContainer.append(btnIncrement);

        const productDesc = createElement('div', 'product-page__desc');
        productDesc.textContent = `${productData.description}`;

        const btnAdd = createElement('button', 'product-page__btn');
        btnAdd.textContent = 'Add to cart';
        btnAdd.addEventListener('click', () => {
            console.log('Add to cart');
            // setProductInCartLocalStorage(productData, true);
        });

        const btnBuy = createElement('button', 'product-page__btn');
        btnBuy.textContent = 'Buy now';
        btnBuy.addEventListener('click', () => {
            console.log('Buy now');
        });

        const btnContainer = createElement('div', 'product-page__buttons');
        btnContainer.append(btnAdd);
        btnContainer.append(btnBuy);

        productContainer.append(productDesc);
        productContainer.append(productStock);
        productContainer.append(countContainer);
        productContainer.append(btnContainer);

        // this.container.append(productContainer);
        return productContainer;
    }

    renderProduct(productData: IProduct) {
        const productContainer = createElement('div', 'product-page__product');
        productContainer.append(this.renderProductImages(productData.images, productData.title));
        productContainer.append(this.renderProductDesc(productData));
        this.container.append(productContainer);
    }

    renderProductPage(productData?: IProduct) {
        if (productData) {
            this.renderNavigationLinks(productData);
            this.renderProduct(productData);
        } else {
            let productDataFromLocalStorage: IProduct;
            const dataTemp = localStorage.getItem('productDataInLocalStorage');

            if (dataTemp) {
                localStorage.removeItem('productDataInLocalStorage');
                productDataFromLocalStorage = <IProduct>JSON.parse(dataTemp);

                // this.renderProductImages(productDataFromLocalStorage.images, productDataFromLocalStorage.title);
                // this.renderProductDesc(productDataFromLocalStorage);
                this.renderNavigationLinks(productDataFromLocalStorage);

                this.renderProduct(productDataFromLocalStorage);
            }
        }
        return this.container;
    }

    render() {
        return this.container;
    }
}

export default ProductPage;
