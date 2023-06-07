import { TProduct, TUsers } from './types';
import { createProduct, createUser, getAllProducts, product, searchProductsByName, searchUserByName, users } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";

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
 const resposta = searchUserByName(name)
 console.log(resposta);
    res.status(200).send(resposta);
});

app.post("/products/add", (req: Request, res: Response) => {
    const {id ,  name , price , description , imageURL} = req.body; 
    res.status(200).send(createProduct(id,name,price,description,imageURL))
}) 

app.post("/users/add", (req: Request, res: Response) => {
    const {id ,  name , email , password } = req.body; 
    res.status(200).send(createUser(id ,  name , email , password ))
    console.log(users)
})



















/* app.post("/product", (req:Request, res:Response)=>{
  
    const  {id , name , price , password, createdAt } = req.body;
    
    const newUser = createUser(id, name, price, password, createdAt)
   
    res.status(200).send(users);
    console.log("teste")
}) */
 

/*  console.table(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
console.table(getAllUsers()); 
 createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação." , "https://picsum.photos/seed/SSD%&gamer/400")
console.table(getAllProducts()); 
console.table(searchUserByName("sAMu")); */
