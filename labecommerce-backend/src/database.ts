import { TUsers , TProduct } from "./types";

export const user : TUsers [] = [
    {
    id :"u001",
    name :"Samuel",
    email :"samuel@gmail.com",
    password: "samuel123",
    createdAt :new Date().toISOString()
},{
    id :"u002",
    name :"Ruan",
    email :"ruan@gmail.com",
    password: "ruan123",
    createdAt :new Date().toISOString()
}
];

export const product : TProduct [] = [
    {
        id : "prod001",
        name : "Mouse gamer",
        price : 250,
        description : "Melhor mouse do mercado!",
        imageURL : "https://picsum.photos/seed/Mouse%20gamer/400",
    },{
        id : "prod002",
        name : "Monitor",
        price : 900,
        description : "Monitor LED Full HD 24 polegadas",
        imageURL : "https://picsum.photos/seed/Monitor/400",
    },
];
