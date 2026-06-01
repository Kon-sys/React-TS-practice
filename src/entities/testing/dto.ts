export type DummyJsonProduct = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    discountPercentage: number;
    brand?: string;
};

export type DummyJsonProductsResponse = {
    products: DummyJsonProduct[];
    total: number;
    skip: number;
    limit: number;
};