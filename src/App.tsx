import React, { 
  useCallback, 
  useEffect, 
  useMemo, 
  useState 
} from 'react';
import cn from 'classNames';
import axios from 'axios';
import './App.scss';
import { PokemonList } from './components/PokemonList/PokemonList';
import { PokemonSpec } from './components/PokemonSpec/PokemonSpec';
import { PokemonData } from './types/PokemonData';
import { Filter } from './components/Filter/Filter';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [choosenPokemon, setChoosenPokemon] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=60&offset=0');
  const [isMoreAvailable, setIsMoreAvailable] = useState(true);
  const [activeType, setActiveType] = useState<string>('');

  const filteredPokemons = useMemo(() => {
    if (activeType) {
      return pokemons.filter(pokemon => pokemon.types.some((type: any) => activeType === type.type.name));
    } else {
      return pokemons;
    }
  }, [pokemons, activeType]);

  const loadPokemons = async () => {
    try {
      setIsLoading(true);

      const result = await axios.get(url);
      setUrl(result.data.next);

      loadPokemonData(result.data.results);
    } catch (error) {
      console.log('Error with loading')
    } finally {
      setIsLoading(false);
    }
  };

  const loadPokemonData = async (result: any, isLoadMore = false) => {
    const promises = result.map(async (pokemon: PokemonData) => {
      const result = await axios.get(pokemon.url);
      return result.data;
    });

    const pokemonData = await Promise.all(promises);

    if (isLoadMore) {
      setPokemons([...pokemons, ...pokemonData]);
    } else {
      setPokemons(pokemonData);
    }
  };

  const loadMore = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (url && isMoreAvailable) {
      setIsLoading(true);
      event.preventDefault();

      try {
        const result = await axios.get(url);

        setUrl(result.data.next);
        loadPokemonData(result.data.results, true);

      } catch (error) {
        console.log('Error with loading')
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsMoreAvailable(false);
    }
  }, [url, isMoreAvailable, loadPokemonData]);

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

        <Filter
          setActiveType={setActiveType}
        />

        <div className='pokemons-wrapper'>
          <div className="pokemons-list-wrapper">
            <PokemonList
              pokemons={filteredPokemons}
              setChoosenPokemon={setChoosenPokemon}
            />

            {isMoreAvailable ? (
              <button
                className={cn(
                  'button is-link load-more-btn',
                  { 'is-loading': isLoading }
                )}
                onClick={loadMore}
              >
                Load more
              </button>
            ) : (
              <button className='button is-link load-more-btn' disabled>
                Load more
              </button>
            )}
          </div>
        </div>

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
