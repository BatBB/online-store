import IProduct from './IProduct';

interface IProductsData {
    limit?: number;
    products: IProduct[];
    skip?: number;
    total?: number;
}

export default IProductsData;
