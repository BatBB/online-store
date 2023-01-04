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
};

const userQuery: UserQueryType = {
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
};

export default userQuery;
