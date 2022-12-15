import Component from '../Component';
import './footer.scss';

const ghAccounts = [
    {
        name: 'BatBB',
        link: 'https://github.com/BatBB',
    },
    {
        name: 'Wanderer0001',
        link: 'https://github.com/wanderer0001',
    },
];

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderLogoRSS() {
        const logoRSS = document.createElement('a');
        logoRSS.className = 'footer__logo-rss';
        logoRSS.textContent = 'RS-School';
        logoRSS.href = 'https://rs.school/js/';

        return logoRSS;
    }

    renderGhLinks() {
        const ghList = document.createElement('ul');
        ghList.className = 'footer__gh-list';

        ghAccounts.forEach((accountLink) => {
            const ghItem = document.createElement('li');
            ghItem.className = 'footer__gh-item';

            const ghLink = document.createElement('a');
            ghLink.className = 'footer__gh-link';
            ghLink.textContent = accountLink.name;
            ghLink.href = accountLink.link;

            ghItem.append(ghLink);
            ghList.append(ghItem);
        });

        return ghList;
    }

    render() {
        this.container.append(this.renderLogoRSS());
        this.container.append(this.renderGhLinks());
        return this.container;
    }
}

export default Footer;
