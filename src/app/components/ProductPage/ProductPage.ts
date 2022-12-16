import Component from '../Component';
import IProduct from '../interfaces/IProduct';
import './productPage.scss';

class ProductPage extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    createElement = (tagName: string, className: string) => {
        const element = document.createElement(tagName);
        element.className = className;
        return element;
    };

    renderProductImages(images: string[], title: string) {
        const productImagesContainer = this.createElement('div', 'product-image-container');

        const productImageMain = this.createElement('div', 'product-image-main');
        const imageMain = document.createElement('img');
        imageMain.className = 'image';
        imageMain.src = images[0];
        imageMain.alt = `Photo ${title}`;
        productImageMain.append(imageMain);

        const productImageSwiper = this.createElement('div', 'product-image-swiper');
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

    renderProductDesc(productData: IProduct) {
        const productContainer = this.createElement('div', 'product-desc-container');

        const productName = this.createElement('p', 'product-name');
        productName.textContent = `${productData.brand} ${productData.title}`;
        productContainer.append(productName);

        const productRating = this.createElement('p', 'product-rating');
        productRating.textContent = `Rating: ${productData.rating} out of 5`;
        productContainer.append(productRating);

        const productPrice = this.createElement('p', 'product-price');
        productPrice.textContent = `${productData.price} $`;
        productContainer.append(productPrice);

        const productStock = this.createElement('p', 'product-stock');
        productStock.textContent = `${productData.stock}`;
        productContainer.append(productStock);

        const countContainer = this.createElement('div', 'product-count-container');
        const btnDecrease = this.createElement('button', 'btn');
        btnDecrease.textContent = '-';
        const productCount = this.createElement('p', 'product-count');
        productCount.textContent = '' || '1';
        const btnIncrement = this.createElement('button', 'btn');
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

        const productDesc = this.createElement('div', 'product-desc');
        productDesc.textContent = `${productData.description}`;
        productContainer.append(productDesc);

        this.container.append(productContainer);
    }

    renderProductPage(productData: IProduct) {
        this.renderProductImages(productData.images, productData.title);
        this.renderProductDesc(productData);
    }

    render() {
        this.renderProductPage({
            id: 25,
            title: 'Gulab Powder 50 Gram',
            description: 'Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds',
            price: 70,
            discountPercentage: 13.58,
            rating: 4.87,
            stock: 47,
            brand: 'Dry Rose',
            category: 'groceries',
            thumbnail: 'https://i.dummyjson.com/data/products/25/thumbnail.jpg',
            images: [
                'https://i.dummyjson.com/data/products/25/1.png',
                'https://i.dummyjson.com/data/products/25/2.jpg',
                'https://i.dummyjson.com/data/products/25/3.png',
                'https://i.dummyjson.com/data/products/25/4.jpg',
                'https://i.dummyjson.com/data/products/25/thumbnail.jpg',
            ],
        });
        return this.container;
    }
}

export default ProductPage;
