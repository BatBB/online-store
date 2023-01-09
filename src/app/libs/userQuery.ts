type UserQueryType = {
    userParams?: URL;
    category: Array<string>;
    brand: Array<string>;
    price: {
        min: number | null;
        max: number | null;
    };
    stock: {
        min: number | null;
        max: number | null;
    };
    page: string | null;
    count: string | null;
    sort: 'recommended' | 'price-low' | 'price-high' | 'rate-low' | 'rate-high';
};

type UserQueryTypeCart = {
    userParams?: URL;
    page_cart: string | null;
    count_cart: string | null;
};

export const userQuery: UserQueryType = {
    userParams: new URL(window.location.href),
    category: [],
    brand: [],
    price: {
        min: 10,
        max: 1749,
    },
    stock: {
        min: 10,
        max: 150,
    },
    page: null,
    count: null,
    sort: 'recommended',
};

export const userQueryCart: UserQueryTypeCart = {
    userParams: new URL(`${window.location.href}/#/cart`),
    page_cart: null,
    count_cart: null,
};
