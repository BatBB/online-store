// import Loader from '../Loader';
// import Component from '../../components/Component';
// // import Product from '../../components/Product/Product';
// // import IProduct from '../../components/interfaces/IProduct';
// import { checkedCategory } from '../../App';

// class ProductsList extends Component {
//     constructor(tagName: string, className: string) {
//         super(tagName, className);
//     }

//     async renderProducts() {
//         const loader = new Loader();
//         let products = await loader.fetchData();
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//         if (checkedCategory.category.length !== 0) {
//             console.log(products);
//             products = products?.filter((item) => checkedCategory.category.includes(item.category));
//         } else {
//             products = await loader.fetchData();
//         }

//         // if (products) {
//         //     this.container.innerHTML = '';
//         //     products.forEach((product: IProduct) => {
//         //         const productItem = new Product('div', 'product-iiii');
//         //         productItem.renderProduct(product);
//         //         this.container.append(productItem.render());
//         //     });
//         // }
//     }

//     render() {
//         void this.renderProducts();
//         return this.container;
//     }
// }

// export default ProductsList;
