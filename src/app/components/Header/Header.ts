import Component from '../Component';

const pages = [
    {
        name: 'mainPage',
        id: 'main-page',
    },
    {
        name: 'basketPage',
        id: 'basket-page',
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
        const navList = document.createElement('ul');
        navList.className = 'header__nav-list';

        pages.forEach((page) => {
            const navItem = document.createElement('li');
            navItem.className = 'header__nav-item';

            const navLink = document.createElement('a');
            navLink.className = 'header__nav-link';
            navLink.textContent = page.name;

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
