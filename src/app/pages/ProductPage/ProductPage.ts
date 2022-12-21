import Component from '../../components/Component';
import IProduct from '../../components/interfaces/IProduct';
import createElement from '../../libs/createElement';
import './productPage.scss';

class ProductPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    private renderProductImages(images: string[], title: string) {
        const productImagesContainer = createElement('div', 'product-image-container');

        const productImageMain = createElement('div', 'product-image-main');
        const imageMain = document.createElement('img');
        imageMain.className = 'image';
        imageMain.src = images[0];
        imageMain.alt = `Photo ${title}`;
        productImageMain.append(imageMain);

        const productImageSwiper = createElement('div', 'product-image-swiper');
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

        this.container.append(productImagesContainer);
    }

    private renderProductDesc(productData: IProduct) {
        const productContainer = createElement('div', 'product-desc-container');

        const productName = createElement('p', 'product-name');
        productName.textContent = `${productData.brand} ${productData.title}`;
        productContainer.append(productName);

        const productRating = createElement('p', 'product-rating');
        productRating.textContent = `Rating: ${productData.rating} out of 5`;
        productContainer.append(productRating);

        const productPrice = createElement('p', 'product-price');
        productPrice.textContent = `${productData.price} $`;
        productContainer.append(productPrice);

        const productStock = createElement('p', 'product-stock');
        productStock.textContent = `${productData.stock}`;
        productContainer.append(productStock);

        const countContainer = createElement('div', 'product-count-container');
        const btnDecrease = createElement('button', 'btn');
        btnDecrease.textContent = '-';
        const productCount = createElement('p', 'product-count');
        productCount.textContent = '' || '1';
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
            if (countProd < productData.stock) {
                productCount.textContent = (++countProd).toString();
            }
        });
        countContainer.append(btnDecrease);
        countContainer.append(productCount);
        countContainer.append(btnIncrement);
        productContainer.append(countContainer);

        const productDesc = createElement('div', 'product-desc');
        productDesc.textContent = `${productData.description}`;
        productContainer.append(productDesc);

        this.container.append(productContainer);
        // return productContainer;
    }

    renderProductPage(productData?: IProduct) {
        if (productData) {
            this.renderProductImages(productData.images, productData.title);
            this.renderProductDesc(productData);
        } else {
            let productDataFromLocalStorage: IProduct;
            const dataTemp = localStorage.getItem('productDataInLocalStorage');

            if (dataTemp) {
                localStorage.removeItem('productDataInLocalStorage');
                productDataFromLocalStorage = <IProduct>JSON.parse(dataTemp);

                this.renderProductImages(productDataFromLocalStorage.images, productDataFromLocalStorage.title);
                this.renderProductDesc(productDataFromLocalStorage);
            }
        }
        return this.container;
    }

    render() {
        return this.container;
    }
}

export default ProductPage;
