import axios from "axios";

const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const PokeClient = {
  // Aqui tava de boa, dois vacilos apenas, o body da resposta que vc tava buscando ta errado
  // o destructuring se baseia num result que a api manda, e não aleatoriamente,
  // na doc da pokeapi tem a estrutura da resposta
  getPokemonByName: async (name) => await client.get(`pokemon/${name.toLowerCase()}`),
};

export default PokeClient;
