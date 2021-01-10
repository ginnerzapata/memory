import { useState, useEffect } from 'react'
import Header from './components/Header'
import PokemonCard from './components/PokemonCard'
import Rules from './components/Rules'

function App() {
  const [data, setData] = useState({})
  const [modifiedData, setModifiedData] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [renderedCards, setRenderedCards] = useState([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    setDataIsLoaded(false)
    fetch('https://pokeapi.co/api/v2/pokedex/26/')
      .then((response) => response.json())
      .then((data) => {
        setData(data.pokemon_entries)
        setModifiedData(data.pokemon_entries)
      })
    setDataIsLoaded(true)
  }, [])

  useEffect(() => {
    if (data.length) setRenderedCards(shuffle(data).slice(0, 3))
  }, [data])

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  function handleClick(id) {
    const newData = modifiedData.map((pokemon) => {
      if (pokemon.active && id === pokemon.entry_number) {
        modifiedData.forEach((pokemon) => delete pokemon.active)
        document.body.style.backgroundColor = 'red'
        setScore(0)

        setTimeout(() => {
          document.body.style.backgroundColor = null
        }, 1000)
        return pokemon
      }

      if (!pokemon.active && id === pokemon.entry_number) {
        setScore(score + 1)
        pokemon.active = true
        getCardsToRender()
      }
      return pokemon
    })
    setModifiedData([...shuffle(newData)])
  }

  function getCardsToRender() {
    const clickedCards = modifiedData.filter(
      (pokemon) => pokemon.active === true
    )
    const unclickedCard = modifiedData.find((pokemon) => !pokemon.active)

    if (clickedCards.length >= 2) {
      setRenderedCards(shuffle(clickedCards.slice(0, 2).concat(unclickedCard)))
      return
    }

    setRenderedCards(shuffle(modifiedData.slice(0, 3)))
  }

  return (
    <div className="container">
      <Header score={score} />

      <main className="row">
        <Rules />
        <div className="memory">
          {!renderedCards.length ? (
            <h2>loading...</h2>
          ) : (
            renderedCards.map((pokemon) => (
              <PokemonCard
                key={pokemon.entry_number}
                pokemon={{ ...pokemon }}
                handleClick={handleClick}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default App

//https://pokeapi.co/api/v2/pokedex/2/
