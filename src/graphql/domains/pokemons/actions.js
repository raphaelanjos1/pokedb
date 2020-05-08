// import pokemons from "../../../db/pokemons";
import PokeClient from "../../../services";

// export const getByType = (_, { type }) =>
//   pokemons.filter((pokemon) => pokemon.type.includes(type));

// export const getById = (_, { id }) =>
//   pokemons.find((pokemon) => pokemon.id === id);

// export const getByNum = (_, { num }) =>
//   pokemons.find((pokemon) => pokemon.num === num);

export const getByName = async (_, { name }) => {
  // pokemons.find((pokemon) => pokemon.name === name);
  const { data } = await PokeClient.getPokemonByName(name);
  console.log({ data })
  // Aqui vc n precisa de um map, vai ter que estruturar esse objeto data
  // e tratar como vc quiser

  return data

};
// export const getAllPokemons = () => pokemons;
