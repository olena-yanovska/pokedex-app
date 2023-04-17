import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import { PokemonList } from './components/PokemonList/PokemonList';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=25';

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
    const promises = result.map(async (pokemon: any) => {
      const result = await axios.get(pokemon.url);
      console.log('result', result);
      return result.data;
    });

    const pokemonData = await Promise.all(promises);
    console.log('pokemonData', pokemonData);
    setPokemons(pokemonData);
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1 className='header-text'>Pokedex</h1>
      </header>
      <main>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='pokemons-wrapper'>
            <div className="pokemons-list-wrapper">
              <PokemonList 
                pokemons={pokemons} 
              />

              <button className='button is-link load-more-btn'>
                Load more
              </button>
            </div>

            <div className='pokemons-data'>
              Pokemon Data
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
