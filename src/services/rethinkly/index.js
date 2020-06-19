import { createLink } from 'rethinkly'

const config = {
  host: process.env.RETHINK_URL,
  port: process.env.RETHINK_PORT,
  db: process.env.DB_NAME,
}

const Rethinkly = () => createLink(config)

export default Rethinkly
