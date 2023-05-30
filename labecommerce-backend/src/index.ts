import { product, user , getAllUsers , creatUser , creatProduct , getAllProducts, searchProductsByName} from "./database";
 console.table(creatUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
console.table(getAllUsers()); 
 creatProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação." , "https://picsum.photos/seed/SSD%&gamer/400")
console.table(getAllProducts()); 
console.table(searchProductsByName("gamer"));
