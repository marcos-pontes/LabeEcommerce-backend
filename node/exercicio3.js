import { countries } from "./countries.js";

const name = process.argv[2];
const code = process.argv[3];

if (!name || !code) {
  console.log("verifique se está passando e codigo corretos");
} else {
  const newCountry = {
    name,
    code
  };
  countries.push(newCountry);
  countries.sort((a, b) => {
    // Comparação das propriedades "name"
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1; // a.name vem antes de b.name
  } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1; // b.name vem antes de a.name
  } else {
    return 0; // a.name e b.name são iguais
  }
  })
  console.log(countries);
}
