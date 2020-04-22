import pokemons from "../../db/pokemons";

export const getById = (_, args) => {
  let filteredPokemon = pokemons.filter((u) => u.id === args.id);
  return filteredPokemon;
};

export const getByNum = (_, args) => {
  let filteredPokemon = pokemons.filter((u) => u.num === args.num);
  return filteredPokemon;
};

export const getByName = (_, args) => {
  let filteredPokemon = pokemons.filter((u) => u.name === args.name);
  return filteredPokemon;
};

export const getAllPokemons = () => pokemons;
