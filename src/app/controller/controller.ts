export type itemProduct = {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}[];

type productsJson = {
    products: itemProduct;
    total: number;
    skip: number;
    limit: number;
};

export async function getData(): Promise<itemProduct> {
    const data: Response = await fetch('https://dummyjson.com/products?limit=10');
    const dataJSON: productsJson = await (<Promise<productsJson>>data.json());
    const dataArray: itemProduct = Array.from(dataJSON.products);

    return dataArray;
}
