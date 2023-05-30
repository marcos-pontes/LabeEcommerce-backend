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
    
export const creatUser = (id : string , name : string ,  email : string , password : string) =>{
const createdAt = new Date().toISOString()
const newUser :TUsers = {id , name , email , password , createdAt} 
user.push(newUser);
return"Cadastro realizado com sucesso"
}

export const creatProduct = (id : string, name : string, price : number, description : string, imageURL : string)  =>{
    const newProduct :TProduct = {id , name , price , description , imageURL }
    product.push(newProduct);
}

export const getAllUsers =() :TUsers[] =>{
    return user
}

export const getAllProducts =() :TProduct[] =>{
    return product
}

export const searchProductsByName = (name:string)  =>{
    const searchProduct =  name
return product.filter(product => product.name.includes(searchProduct))
}

