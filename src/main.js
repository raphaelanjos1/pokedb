import koa from 'koa'
import koaRouter from 'koa-router'
import { ApolloServer } from 'apollo-server-koa'
import schema from './graphql'

const server = new ApolloServer({ schema })
const app = new koa()
const router = new koaRouter()

const { graphqlPath } = server
const port = 3000

server.applyMiddleware({ app })

app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`)
)
