import axios from "axios";

const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const PokeClient = {
  getPokemonByName: async (name) => {
    const {
      data: { pokemon },
    } = await client.get("pokemon", {
      params: {
        pokemon_name: name,
      },
    });
  },
};

export default PokeClient;
