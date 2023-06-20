import { countries } from "./countries.js";

const paisBuscado = process.argv[2];

if (!paisBuscado) {
  console.log("falta passar o país desejado");
} else {
  const resultadoPaises = countries.filter((pais) => {
   return pais.name.toLowerCase()[0].includes(paisBuscado.toLowerCase())
});
console.log(resultadoPaises)
}