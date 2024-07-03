
export type User = {
    id: number,
    name: string,
    createdAt: Date,
    asscessToken: string,
    refreshToken: string
}


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

export type AddProduct = {
    imgSrc: null | string;
    fileKey: null | string;
    name: string;
    price: string;
    category: string;
}

export type PopupState = {
    isVisible: boolean;
    content?: React.ReactNode;
    onClose?: () => void;
}