import { getData } from '../../controller/controller';
import Component from '../Component';
import Product from '../Product/Product';

class ProductsList extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    async renderProduct(): Promise<void> {
        const productsData = await getData();
        const products: Product[] = [];
        for (let i = 0; i < productsData.length; i++) {
            products.push(
                new Product(
                    'div',
                    'product-item',
                    productsData[i].title,
                    productsData[i].id,
                    productsData[i].category,
                    productsData[i].price,
                    productsData[i].description,
                    productsData[i].brand,
                    productsData[i].rating,
                    productsData[i].discountPercentage,
                    productsData[i].stock
                )
            );
            this.container.append(products[i].render());
        }
    }

    render() {
        void this.renderProduct();
        return this.container;
    }
}

export default ProductsList;
