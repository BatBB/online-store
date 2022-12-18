import Route from '../../routes/routes';
import Component from '../Component';
import './header.scss';

const pages = [
    {
        name: 'Main page',
        id: 'main-page',
        path: '/',
    },
    {
        name: 'Cart',
        id: 'cart-page',
        path: '/cart',
    },
];

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderLogo() {
        const logo = document.createElement('h1');
        logo.className = 'header__logo';
        logo.textContent = 'MegaSuperPuperOnlineStore';
        return logo;
    }

    renderNav() {
        const route = new Route();
        const navList = document.createElement('ul');
        navList.className = 'header__nav-list';

        pages.forEach((page) => {
            const navItem = document.createElement('li');
            navItem.className = 'header__nav-item';

            const navLink = document.createElement('a');
            navLink.className = 'header__nav-link';
            navLink.href = page.path;
            navLink.textContent = page.name;

            navLink.addEventListener('click', (event: Event) => {
                event.preventDefault();
                console.log(page.path);
                window.location.hash = page.path;
                route.router(page.path);
            });

            navItem.append(navLink);
            navList.append(navItem);
        });

        return navList;
    }

    render() {
        this.container.append(this.renderLogo());
        this.container.append(this.renderNav());
        return this.container;
    }
}

export default Header;
