import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./domains/pokemons";

export default makeExecutableSchema({ typeDefs, resolvers });
