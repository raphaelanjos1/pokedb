import { gql } from 'apollo-server-koa'

export default gql`
  type Pokemon {
    poke_id: Int
    order: String
    name: String
    img: String
    type: [String]
    height: String
    weight: String
    hp: Int
    attack: Int
    defense: Int
    special_attack: Int
    special_defense: Int
    speed: Int
    evolution_chain: [Evolution]
  }

  type Evolution {
    species_name: String
    species_img: String
    min_level: Int
    trigger_name: String
    item_name: String
  }

  type Query {
    getById(poke_id: Int): Pokemon
    getByName(name: String): Pokemon
    getAllPokemons: [Pokemon]
    getByType(type: String): [Pokemon]
  }
`
