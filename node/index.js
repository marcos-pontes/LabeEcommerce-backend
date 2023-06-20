//process.argv = node[0] nomeAquivo=[1] infos=[2]
/* const nome = process.argv[2]
const sobreNome = process.argv[3]

console.log(`O primeiro nome é ${nome} e o sobrenome é ${sobreNome}`) */

import { countries } from "./countries.js";

const paisBuscado = process.argv[2];

if (!paisBuscado) {
  console.log("falta passar o país desejado");
} else {
  const resultadoPaises = countries.filter((pais) => {
   return pais.name.toLowerCase().includes(paisBuscado.toLowerCase())
});
console.log(resultadoPaises)
}

