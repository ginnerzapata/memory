import { useState, useEffect } from 'react'

function PokemonCard({ pokemon, handleClick }) {
  const [data, setData] = useState({})
  const [loadingData, setIsLoadingData] = useState(false)

  useEffect(() => {
    setIsLoadingData(true)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.name}`)
      .then((response) => response.json())
      .then((data) => setData(data))
    setIsLoadingData(true)
  }, [pokemon.pokemon_species.name])

  return (
    <article
      className="box card"
      onClick={() => handleClick(pokemon.entry_number)}
    >
      {data.sprites && (
        <img
          className="pokemon-img"
          alt={`${pokemon.pokemon_species.name} sprite`}
          src={data.sprites.front_default}
        />
      )}
      <h3 onClick={() => console.log(data.sprites.front_default)}>
        #{pokemon.entry_number} {pokemon.pokemon_species.name}
      </h3>
    </article>
  )
}

export default PokemonCard
