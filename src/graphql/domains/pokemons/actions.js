import PokeClient from '../../../services'
import axios from 'axios'
// import { data as rtkData, createLink } from 'rethinkly'
// import logger from 'hoopa-logger'

export const getById = async (_, { id }) => {
  const { data } = await PokeClient.getById(id)
  const specie = await PokeClient.getSpecieById(id)
  const chain = specie.data.evolution_chain.url
  const evolutionChain = await axios.get(chain)

  const evoChain = []
  let evoData = evolutionChain.data.chain

  do {
    const evoDetails = evoData['evolution_details'][0]
    const evoPic = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-form/${evoData.species.name}/`
    )

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
    evoData = evoData['evolves_to'][0]
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

  return {
    id: data.id,
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

  // const db = 'pokedb'
  // const connection = await createLink({
  //   host: '142.93.224.48',
  //   port: '28015',
  //   db,
  // })

  const evoChain = []
  let evoData = evolutionChain.data.chain

  do {
    const evoDetails = evoData['evolution_details'][0]
    const evoPic = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-form/${evoData.species.name}/`
    )

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
    evoData = evoData['evolves_to'][0]
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

  // await rtkData.insert(connection, 'pokemon', {
  //   id: data.id,
  //   order: data.order,
  //   name: data.name,
  //   img: data.sprites.front_default,
  //   type: data.types.map((el) => {
  //     return el.type.name
  //   }),
  //   height: data.height,
  //   weight: data.weight,
  //   hp: data.stats[5].base_stat,
  //   attack: data.stats[4].base_stat,
  //   defense: data.stats[3].base_stat,
  //   special_attack: data.stats[2].base_stat,
  //   special_defense: data.stats[1].base_stat,
  //   speed: data.stats[0].base_stat,
  //   evolution_chain: evoChain,
  // })

  // console.log(await rtkData.get(connection, 'pokemon'))

  return {
    id: data.id,
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
  const { data } = await PokeClient.getPokemons()
  return {
    name: data.results.map((el) => {
      return el.name
    }),
  }
}
