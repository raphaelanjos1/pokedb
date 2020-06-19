import { PokeClient, rethinkly } from '../../../services'
import axios from 'axios'
import { data as rtkData, createLink, database, table } from 'rethinkly'
import logger from 'hoopa-logger'

export const getById = async (_, { poke_id }) => {
  const { data } = await PokeClient.getById(poke_id)
  const specie = await PokeClient.getSpecieById(poke_id)
  const chain = specie.data.evolution_chain.url
  const evolutionChain = await axios.get(chain)

  const evoChain = []
  let evoData = evolutionChain.data.chain

  do {
    const evoDetails = evoData['evolution_details'][0]
    const evoPic = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-form/${evoData.species.name}/`
    )

    if (data.name !== evoData.species.name) {
      evoChain.push({
        species_name: evoData.species.name,
        species_img: evoPic.data.sprites.front_default,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item_name: !evoDetails
          ? null
          : evoDetails.item === null
          ? evoDetails.item
          : evoDetails.item.name,
      })
    }

    evoData = evoData['evolves_to'][0]
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

  return {
    poke_id: data.id,
    order: data.order,
    name: data.name,
    img: data.sprites.front_default,
    type: data.types.map((el) => {
      return el.type.name
    }),
    height: data.height,
    weight: data.weight,
    hp: data.stats[5].base_stat,
    attack: data.stats[4].base_stat,
    defense: data.stats[3].base_stat,
    special_attack: data.stats[2].base_stat,
    special_defense: data.stats[1].base_stat,
    speed: data.stats[0].base_stat,
    evolution_chain: evoChain,
  }
}

export const getByName = async (_, { name }) => {
  const { data } = await PokeClient.getPokemonByName(name)
  const specie = await PokeClient.getSpecieByName(name)
  const chain = specie.data.evolution_chain.url
  const evolutionChain = await axios.get(chain)

  const evoChain = []
  let evoData = evolutionChain.data.chain

  do {
    const evoDetails = evoData['evolution_details'][0]
    const evoPic = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-form/${evoData.species.name}/`
    )

    if (name !== evoData.species.name) {
      evoChain.push({
        species_name: evoData.species.name,
        species_img: evoPic.data.sprites.front_default,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item_name: !evoDetails
          ? null
          : evoDetails.item === null
          ? evoDetails.item
          : evoDetails.item.name,
      })
    }

    evoData = evoData['evolves_to'][0]
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

  return {
    poke_id: data.id,
    order: data.order,
    name: data.name,
    img: data.sprites.front_default,
    type: data.types.map((el) => {
      return el.type.name
    }),
    height: data.height,
    weight: data.weight,
    hp: data.stats[5].base_stat,
    attack: data.stats[4].base_stat,
    defense: data.stats[3].base_stat,
    special_attack: data.stats[2].base_stat,
    special_defense: data.stats[1].base_stat,
    speed: data.stats[0].base_stat,
    evolution_chain: evoChain,
  }
}

export const getAllPokemons = async () => {
  const conn = await rethinkly()
  const pokemons = await rtkData.get(conn, 'pokemon')
  return pokemons
  // // await database.create(conn, 'pokedb')
  // // await table.create(conn, 'pokemon')

  // logger.info('Getting all pokemons data...')
  // const {
  //   data: { results },
  // } = await PokeClient.getPokemons()

  // const pokemonsPromises = results.map(({ name }) => getByName(null, { name }))

  // const pokemons = Promise.all(pokemonsPromises)
  //   .then((data) => {
  //     logger.info('Get is done!')
  //     // await rtkData.insert(conn, data)

  //     return data
  //   })
  //   .catch((error) => logger.error(`Get all data error: ${error}`))

  // return pokemons
}
