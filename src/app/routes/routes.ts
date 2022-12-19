// import App from '../App';
import App from '../App';
// import IProduct from '../components/interfaces/IProduct';
import ProductPage from '../pages/ProductPage/ProductPage';

class Route {
    static routes = {
        '/': 'mainPage',
        '/cart': 'cartPage',
        '/products': 'productsPage',
    };

    private productPage = new ProductPage('div', 'product-page');

    router(href: string) {
        console.log('href', href);

        if (href === '/' || href === '') {
            App.renderCurrentPage('main-page');
        } else if (href.includes('/products/')) {
            App.renderCurrentPage('product-page');
        } else {
            const mainId = document.getElementById('main');

            if (mainId) mainId.innerHTML = '';
            if (mainId) mainId.innerHTML = 'error 404';
        }
    }

    eventDOMContentLoaded() {
        window.addEventListener('DOMContentLoaded', () => {
            console.log('load --------------------------');
            this.router(window.location.hash.slice(1));
        });
    }

    eventHashChange() {
        window.addEventListener('hashchange', () => {
            console.log('____________eventHashChange');
            // let product: IProduct;
            // const productObjInLocalStorage: string | null = localStorage.getItem('productObjInLocalStorage');
            // if (productObjInLocalStorage) {
            //     product = <IProduct>JSON.parse(productObjInLocalStorage);
            //     localStorage.removeItem('productObjInLocalStorage');
            //     this.router(window.location.hash.slice(1));
            // } else {
            // }
            this.router(window.location.hash.slice(1));
        });
    }
}

export default Route;
