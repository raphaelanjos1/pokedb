import axios from 'axios'

const client = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
})

const PokeClient = {
  getPokemonByName: async (name) =>
    await client.get(`pokemon/${name.toLowerCase()}`),
  getById: async (id) => await client.get(`pokemon/${id}`),
  getSpecieById: async (id) => await client.get(`pokemon-species/${id}`),
  getSpecieByName: async (name) =>
    await client.get(`pokemon-species/${name.toLowerCase()}`),
  getPokemons: async () => await client.get(`pokemon?limit=151`),
}

export default PokeClient
