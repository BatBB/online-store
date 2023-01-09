import Header from '../components/Header/Header';
import ICartData from '../components/interfaces/ICartData';
import IProduct from '../components/interfaces/IProduct';

export function setProductInCartLocalStorage(productData: IProduct, dec = 0) {
    const productsInCart = localStorage.getItem('productsInCart');
    if (productsInCart !== null) {
        const products: ICartData[] = <ICartData[]>JSON.parse(productsInCart);

        const indexProd = products.findIndex((prod) => prod.product.id === productData.id);
        if (indexProd === -1) {
            products.push({
                product: productData,
                count: dec || 1,
            });
        } else {
            if (products[indexProd].count < productData.stock && dec) products[indexProd].count += dec;
            if (products[indexProd].count > 1 && !dec) products[indexProd].count -= 1;
        }
        localStorage.setItem('productsInCart', JSON.stringify(products));
    } else {
        const prod: ICartData[] = [
            {
                product: productData,
                count: 1,
            },
        ];
        localStorage.setItem('productsInCart', JSON.stringify(prod));
    }
    //обновление количества товара в header
    Header.updateCountProduct();
}

export function getDataInLocalStorage() {
    const productsInCart = localStorage.getItem('productsInCart');
    if (productsInCart !== null) {
        const products: ICartData[] = <ICartData[]>JSON.parse(productsInCart);
        return products;
    } else {
        return null;
    }
}

export function delProductInCartLocalStorage(id: number) {
    const productsInCart = localStorage.getItem('productsInCart');
    if (productsInCart) {
        const products: ICartData[] = <ICartData[]>JSON.parse(productsInCart);
        const newData = products.filter((item) => item.product.id !== id);
        localStorage.setItem('productsInCart', JSON.stringify(newData));
    }
    Header.updateCountProduct();
}
