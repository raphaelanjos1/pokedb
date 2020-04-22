import { gql } from "apollo-server-koa";

export default gql`
  type Pokemon {
    id: Int
    num: String
    name: String
    img: String
    type: [String]
    height: String
    weight: String
    weaknesses: [String]
    prev_evolution: [Evolution]
    next_evolution: [Evolution]
  }

  type Evolution {
    num: String
    name: String
  }

  type Query {
    getById(id: Int): Pokemon
    getByNum(num: String): Pokemon
    getByName(name: String): Pokemon
    getAllPokemons: [Pokemon]
  }
`;
