import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

  const loadPokemons = async () => {
    try {
      setIsLoading(true);

      const result = await axios.get(API_URL);
      loadPokemonData(result.data.results);
    } catch (error) {
      setIsError(true);
      console.log('Error with loading')
    } finally {
      setIsLoading(false);
    }
  };

  const loadPokemonData = async (result: any) => {
    result.map(async (pokemon: any) => {
      const result = await axios.get(pokemon.url);
      
      setPokemons(prev => [...prev, result.data])
      console.log('pokemon data', result);
    })
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokedex App</h1>
      </header>
      <main>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="pokemonsList">
            {pokemons && pokemons.map(pokemon => (
              <div className="pokemon">
                <img
                  src={pokemon.sprites.front_default}
                  alt=""
                />
                <div>{pokemon.name}</div>
                <div>{pokemon.types.map((pokemon: any) => pokemon.type.name)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
