export type CartProduct = {
    id: number;
    title: string;
    img: string;
    price: number;
    quantity: number;
};

export type Product = {
    _id: string;
    imgSrc: string;
    fileKey: string;
    name: string;
    price: string;
    category: string;
}