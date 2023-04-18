import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.scss'
import { PokemonList } from './components/PokemonList/PokemonList';
import { PokemonSpec } from './components/PokemonSpec/PokemonSpec';
import { PokemonData } from './types/PokemonData';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [choosenPokemon, setChoosenPokemon] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=3&offset=0');
  const [isMoreAvailable, setIsMoreAvailable] = useState(true);

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

    const loadMore = async (event: React.MouseEvent<HTMLButtonElement>) => {

      if (url && isMoreAvailable) {
        setIsLoading(true);
        event.preventDefault();

        try {
          const result = await axios.get(url);
          setUrl(result.data.next);
          loadPokemonData(result.data.results, true);

          setTimeout(() => {
            loadMoreButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
          
        } catch (error) {
          setIsError(true);
          console.log('Error with loading')
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsMoreAvailable(false);
      }
    };

  const loadPokemons = async () => {
    try {
      setIsLoading(true);

      const result = await axios.get(url);
      setUrl(result.data.next);

      loadPokemonData(result.data.results);
    } catch (error) {
      setIsError(true);
      console.log('Error with loading')
    } finally {
      setIsLoading(false);
    }
  };

  const loadPokemonData = async (result: any, isLoadMore = false) => {
    
    const promises = result.map(async (pokemon: PokemonData) => {
      const result = await axios.get(pokemon.url);
      console.log('result', result);
      return result.data;
    });

    const pokemonData = await Promise.all(promises);
    
    if (isLoadMore) {
      setPokemons([...pokemons, ...pokemonData]);
    } else {
      setPokemons(pokemonData);
    }
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <a href="/">
          <h1 className='header-text'>Pokedex</h1>
        </a>
      </header>
      <main className='main'>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='pokemons-wrapper'>
            <div className="pokemons-list-wrapper">
              <PokemonList
                pokemons={pokemons}
                setChoosenPokemon={setChoosenPokemon}
              />

              {isMoreAvailable && (
                <button 
                  ref={loadMoreButtonRef}
                  className='button is-link load-more-btn'
                  onClick={loadMore}
                >
                  Load more
                </button>
              )}
            </div>
          </div>
        )}

        <div className='pokemons-data'>
          <PokemonSpec
            pokemon={choosenPokemon}
            setChoosenPokemon={setChoosenPokemon}
          />
        </div>
      </main>
    </div>
  );
}
