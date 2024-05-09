export type Restaurant = {
    id: string,
    name: string,
    picture: string,
    category: string,
    price: number,
    open: boolean,
    rating: number
}

export type Review = {
    name: string,
    image: string,
    text: string,
    rating: number
}