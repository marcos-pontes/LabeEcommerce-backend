import { TProduct,  } from "./types";
import {
  

  products,
 
  users,
} from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Service listening on gate 3003");
});
//Get all users
app.get("/users", async(req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM users
    `);
    const name = req.query.name as string;
   const userFilter = result.filter((users:any) =>
    users.name.toLowerCase().includes(name.toLowerCase())
  )
  if(!userFilter.length){
    res.statusCode=404;
    throw new Error("User not found")
  }
  if(name){
    res.status(200).send(userFilter);
  }else{
    res.status(200).send(result)
  }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});

//Get all products

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM products
    `);
    
    const name = req.query.name as string;
   const prodFilter = result.filter((products:any) =>
    products.name.toLowerCase().includes(name.toLowerCase())
  )
  if(!prodFilter.length){
    res.statusCode=404;
    throw new Error("Product not foundd")
  }
  if(name){
    res.status(200).send(prodFilter);
  }else{
    res.status(200).send(result)
  }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await db.raw(`
    SELECT *
FROM products
WHERE id = '${id}';
    `);
    
   const prodFilter = result.filter((products:any) =>
    products.id == id
  )
  if(!prodFilter.length){
    res.statusCode=404;
    throw new Error("ID does not exist")
  } 
  
    res.status(200).send(result);
  
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});

/* app.get("/users/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const resposta = searchUserByName(name);
  console.log(resposta);
  res.status(200).send(resposta);
}); */

//Create a new user
app.post("/users/add", async(req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM users
    `);
    const { id, name, email, password } = req.body;
    const createdAt = new Date().toISOString();
    const repetId = result.find((user:any) => user.id === id);
    const repetEmail = result.find((user:any) => user.email === email);
    
    if (!id || !name || !email || !password) {
      res.statusCode = 428;
      throw new Error("Check the filled fields");
    }
    if (repetId) {
      res.statusCode = 412;
      throw new Error("id already exists, try another id");
    }
    if (repetEmail) {
      res.statusCode = 412;
      throw new Error("email already exists, try another id");
    }
    await db.raw(`
    INSERT INTO users (id, name, email, password, created_at)
    VALUES('${id}', '${name}' , '${email}', '${password}', '${createdAt}');
        `)
    res.status(201).send("Successfully registered user");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});

//Create a new product
app.post("/products/add", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM products
    `);
    const { id, name, price, description, imageURL } = req.body;
    const repetId = result.find((products:any) => products.id === id);
    
    if (!id || !name || !price || !description || !imageURL) {
      res.statusCode = 428;
      throw new Error("Check the filled fields");
    }
    if (repetId) {
      res.statusCode = 412;
      throw new Error("id already exists, try another id");
    }
    const newProduct: TProduct = { id, name, price, description, imageURL };
    await db.raw(`
    INSERT INTO products (id, name, price, description, image_url)
    VALUES('${id}', '${name}', '${price}', '${description}', '${imageURL}')
    `)
    res.status(201).send("Product added sucessfully");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    
    res.status(500).send("Unknown error");
  }
});
//Delete User
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleteById = users.findIndex((user) => user.id.toLowerCase() === id.toLowerCase());
    if (!id) {
      res.statusCode = 400;
      throw new Error("id already exists, try another id");
    }
    if (deleteById < 0) {
      res.statusCode = 403;
      throw new Error("product does not exist or has already been deleted");
    }
    users.splice(deleteById, 1);
    res.status(200).send("Successfully deleted user");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});
//Delete product
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleteById = products.findIndex(
      (product) => product.id.toLowerCase() === id.toLowerCase()
    );
    if (!id) {
      res.statusCode = 400;
      throw new Error("id already exists, try another id");
    }
    if (deleteById < 0) {
      res.statusCode = 404;
      throw new Error("product does not exist or has already been deleted");
    }
    products.splice(deleteById, 1);
    res.status(200).send("Successfully deleted product");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});
//Edit user
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
  const { id: newId, name, email, password } = req.body;
  const findUser = users.find((user) => user.id.toLowerCase() === id.toLowerCase());

  if(newId && newId[0] !=='u'){
    res.statusCode = 400;
    throw new Error('The ID field must start with the letter "u".')
  }

  if (findUser) {
    findUser.id = newId || findUser.id;
    findUser.name = name || findUser.name;
    findUser.email = email || findUser.email;
    findUser.password = password || findUser.password;
    
  } else {
    res.statusCode = 404;
    throw new Error('User not edited, check information')
  }
  res.status(200).send("Successfully updated user");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
  
});
//Edit product
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
    SELECT * FROM products
    `);
    const id = req.params.id;
  const { id: newId, name, price, description, imageURL } = req.body;
  const findproduct = result.find(
    (product:any) => product.id.toLowerCase() === id.toLowerCase()
  );
  const findIndex = result.findIndex((product:any) => product.id.toLowerCase() === id.toLowerCase())

    if (findIndex <0){
      res.statusCode = 404
      throw new Error("ID not found")
    }

  if(newId && newId[0] !=='p'){
    res.statusCode = 400;
    throw new Error('The ID field must start with the letter "p".')
  }

  if (findproduct) {
    findproduct.id = newId || findproduct.id;
    findproduct.name = name || findproduct.name;
    findproduct.price = price || findproduct.price;
    findproduct.description = description || findproduct.description;
    findproduct.imageURL = imageURL || findproduct.imageURL;
    res.status(200).send("Successfully updated product");
    
  }
    
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});

app.post('/purchases', async (req: Request, res:Response) => {
  try {
    const { id, buyer, total_price} = req.body;
    const created_at = new Date().toISOString();
    const result = await db.raw(`
    SELECT * FROM purchases
    `);
    const idPurchases = result.find((p:any)=> p.id === id)
    if(idPurchases){
      res.statusCode = 401;
      throw new Error("ID already exists!")
    }
    if(!id || !buyer || !total_price) {
      res.statusCode = 404;
      throw new Error("invalid data")
    }
    console.log(1)
    if(typeof total_price !== 'number' || isNaN(total_price)){
      res.statusCode = 404;
      throw new Error("total price must be a Number!")
    }
    await db.raw(`
    INSERT INTO purchases(id, buyer , total_price , created_at)
VALUES("${id}","${buyer}","${total_price}","${created_at}");
    `)
    res.status(201).send("Purchase completed successfully")
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
  
});

app.get('/purchase', async(req:Request, res:Response) => {
const result = await db.raw(`
SELECT * FROM purchases;
    `);
    res.status(200).send(result)
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await db.raw(`
    SELECT *
FROM purchases
WHERE id = '${id}';
    `);
    
   const prodFilter = result.filter((products:any) =>
    products.id == id
  )
  if(!prodFilter.length){
    res.statusCode=404;
    throw new Error("ID does not exist")
  } 
  
    res.status(200).send(result);
  
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.status(500).send("Unknown error");
  }
});
