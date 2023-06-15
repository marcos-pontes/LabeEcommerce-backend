import { TProduct, TUsers } from "./types";
import {
  createProduct,
  createUser,
  products,
  searchProductsByName,
  searchUserByName,
  users,
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { send } from "process";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Service listening on gate 3003");
});

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/products/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  res.status(200).send(searchProductsByName(name));
});

app.get("/users/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const resposta = searchUserByName(name);
  console.log(resposta);
  res.status(200).send(resposta);
});

app.post("/products/add", (req: Request, res: Response) => {
  const { id, name, price, description, imageURL } = req.body;
  res.status(200).send(createProduct(id, name, price, description, imageURL));
});

app.post("/users/add", (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;
  res.status(200).send(createUser(id, name, email, password));
  console.log(users);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const deleteById = products.findIndex(
    (product) => product.id.toLowerCase() === id.toLowerCase()
  );
  if (deleteById >= 0) {
    products.splice(deleteById, 1);
    res.status(200).send("Successfully deleted product");
  } else {
    res.status(404).send("Product not found");
  }
  console.table(products);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const deleteById = users.findIndex(
    (user) => user.id.toLowerCase() === id.toLowerCase()
  );
  if (deleteById >= 0) {
    users.splice(deleteById, 1);
    res.status(200).send("Successfully deleted user");
  } else {
    res.status(404).send("user not found");
  }
  console.table(users);
});

app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { id: newId, name, email, password } = req.body;
  const findUser = users.find(
    (user) => user.id.toLowerCase() === id.toLowerCase()
  );
  if (findUser) {
    findUser.id = newId || findUser.id;
    findUser.name = name || findUser.name;
    findUser.email = email || findUser.email;
    findUser.password = password || findUser.password;
    res.status(200).send("Successfully updated user");
    console.log(users);
  } else {
    res.status(400).send("user not updated");
    console.log(users);
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { id: newId, name, price, description, imageURL } = req.body;
  const findproduct = products.find((product) => product.id.toLowerCase() === id.toLowerCase());
  if (findproduct) {
    findproduct.id = newId || findproduct.id;
    findproduct.name = name || findproduct.name;
    findproduct.price = price || findproduct.price;
    findproduct.description = description || findproduct.description;
    findproduct.imageURL = imageURL || findproduct.imageURL;
    res.status(200).send("Successfully updated product");
    console.log(products);
  } else {
    res.status(400).send("product not updated");
    console.log(products);
  }
});
