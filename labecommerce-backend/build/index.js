"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.table((0, database_1.creatUser)("u003", "Astrodev", "astrodev@email.com", "astrodev99"));
console.table((0, database_1.getAllUsers)());
(0, database_1.creatProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://picsum.photos/seed/SSD%&gamer/400");
console.table((0, database_1.getAllProducts)());
console.table((0, database_1.searchProductsByName)("gamer"));
