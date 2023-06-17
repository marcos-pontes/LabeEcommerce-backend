import { TUsers, TProduct } from "./types";

export const users: TUsers[] = [
  {
    id: "u001",
    name: "Samuel",
    email: "samuel@gmail.com",
    password: "samuel123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Ruan",
    email: "ruan@gmail.com",
    password: "ruan123",
    createdAt: new Date().toISOString(),
  },
];

export const products: TProduct[] = [
  {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageURL: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageURL: "https://picsum.photos/seed/Monitor/400",
  },
];

export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string
) => {
  const createdAt = new Date().toISOString();
  const newUser: TUsers = { id, name, email, password, createdAt };
  users.push(newUser);
  return "Cadastro realizado com sucesso";
};

export const createProduct = (
  id: string,
  name: string,
  price: number,
  description: string,
  imageURL: string
) => {
  const newProduct: TProduct = { id, name, price, description, imageURL };
  products.push(newProduct);
  return "Cadastro realizado com sucesso";
};

export const getAllUsers = () => {
  return users;
};

export const getAllProducts = (): TProduct[] => {
  return products;
};

export const searchProductsByName = (name: string): TProduct[] => {
  const searchProduct = name.toLowerCase();
  return products.filter((products) =>
    products.name.toLowerCase().includes(searchProduct)
  );
};

export const searchUserByName = (name: string) => {
  const searchUser = name.toLowerCase();
  return users.filter((user) => user.name.toLowerCase().includes(searchUser));
};
