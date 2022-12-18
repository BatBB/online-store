// import App from '../App';
import IProduct from '../components/interfaces/IProduct';
import ProductPage from '../pages/ProductPage/ProductPage';

class Route {
    static routes = {
        '/': 'mainPage',
        '/cart': 'cartPage',
        '/products': 'productsPage',
    };

    private productPage = new ProductPage('div', 'product-page');

    router(href: string, product?: IProduct) {
        const mainId = document.getElementById('main');
        console.log('this.mainId', mainId);

        if (mainId) mainId.innerHTML = '';
        if (href === '/') {
            console.log('main Page');
        } else if (href.includes('/products/')) {
            const linkArray = href.split('/');
            console.log(linkArray);
        } else {
            if (mainId) mainId.innerHTML = 'error 404';
        }
    }

    eventDOMContentLoaded() {
        window.addEventListener('DOMContentLoaded', () => {
            console.log(window.location.hash);
            this.router(window.location.hash.slice(1));
        });
    }

    eventHashChange() {
        window.addEventListener('hashchange', () => {
            console.log('eventHashChange');
            console.log(window.location.hash);
            this.router(window.location.hash.slice(1));
        });
    }
}

export default Route;
