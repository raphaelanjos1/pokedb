import pokemons from "../../../db/pokemons";

export const getByType = (_, { type }) =>
  pokemons.filter((pokemon) => pokemon.type.includes(type));

export const getById = (_, { id }) =>
  pokemons.find((pokemon) => pokemon.id === id);

export const getByNum = (_, { num }) =>
  pokemons.find((pokemon) => pokemon.num === num);

export const getByName = (_, { name }) =>
  pokemons.find((pokemon) => pokemon.name === name);

export const getAllPokemons = () => pokemons;
