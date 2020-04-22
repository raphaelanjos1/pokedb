import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./pokemons";

export default makeExecutableSchema({ typeDefs, resolvers });
