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
  const apiResults = await PokeClient.getByName(name);
  const toInsert = apiResults.map(({ pokemon }) => ({
    ...pokemon,
    name,
  }));
  return toInsert;
};
// export const getAllPokemons = () => pokemons;
