import React, { useEffect, useState } from 'react';
import './App.css'

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  function wait(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }
  
  function getPokemons() {
    // keep this delay for testing purpose
    return wait(500)
      .then(() => fetch(API_URL))
      .then(response => response.json());
  }

  const loadPokemons = async () => {
    try {
      setIsLoading(true);

      const pokemons = await getPokemons();
      setPokemons(pokemons.results);
      console.log('pokemons', pokemons)
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

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
                <div>{pokemon.name}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
