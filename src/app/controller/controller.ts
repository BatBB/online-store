type itemProduct = {
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

export async function getData(): Promise<any> {
    const data = await fetch('https://dummyjson.com/products');
    const dataJSON = await data.json();
    const dataArray: itemProduct = Array.from(dataJSON.products);

    return dataArray;
}


