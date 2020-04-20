import koa from "koa"; // koa@2
import koaRouter from "koa-router";
import koaBody from "koa-bodyparser";
import { graphqlKoa } from "apollo-server-koa";
import { graphiqlKoa } from "apollo-server-koa";
import pokemons from "./db/pokemons.json";
import { makeExecutableSchema } from "graphql-tools";

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

const typeDefs = `
  type Query { pokemons: [Pokemon] }
  type Pokemon { name: String, speed: Number }
`;

const resolvers = {
  Query: { pokemons: () => pokemons },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// koaBody is needed just for POST.
app.use(koaBody());

router.post("/graphql", graphqlKoa({ schema: schema }));
router.get("/graphql", graphqlKoa({ schema: schema }));
router.get(
  "/graphiql",
  graphiqlKoa({
    endpointURL: "/graphql", // a POST endpoint that GraphiQL will make the actual requests to
  })
);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
