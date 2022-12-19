import App from '../App';
import Loader from '../loader/Loader';

class Route {
    async router(href: string) {
        if (href === '/' || href === '') {
            App.renderCurrentPage('main-page');
        } else if (href.includes('/product/') && href !== '/product/') {
            const idProduct = href.slice(9);

            const products = await Loader.fetchData();
            const countProducts = products ? products.length : 0;
            const productData = products?.find((prod) => prod.id === Number(idProduct));

            if (Number(idProduct) && Number(idProduct) <= countProducts) {
                localStorage.setItem('productDataInLocalStorage', JSON.stringify(productData));
                App.renderCurrentPage('product-page');
            } else {
                const mainId = document.getElementById('main');
                if (mainId) mainId.innerHTML = '';
                if (mainId) mainId.innerHTML = 'error 404';
            }
        } else if (href === '/cart') {
            // App.renderCurrentPage('cart-page');
            const mainId = document.getElementById('main');
            if (mainId) mainId.innerHTML = '';
            if (mainId) mainId.innerHTML = 'CART PAGE';
        } else {
            // App.renderCurrentPage('error-page');

            const mainId = document.getElementById('main');
            if (mainId) mainId.innerHTML = '';
            if (mainId) mainId.innerHTML = 'error 404';
        }
    }

    eventDOMContentLoaded() {
        window.addEventListener('DOMContentLoaded', () => {
            void this.router(window.location.hash.slice(1));
        });
    }

    eventHashChange() {
        window.addEventListener('hashchange', () => {
            void this.router(window.location.hash.slice(1));
        });
    }
}

export default Route;
