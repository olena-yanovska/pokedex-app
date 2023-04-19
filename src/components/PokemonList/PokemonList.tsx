import React, { Dispatch, memo } from 'react';
import './PokemonList.scss';
import { PokemonListData } from '../../types/PokemonListData';
import { Pokemon } from '../Pokemon/Pokemon';

interface Props {
  pokemons: PokemonListData[],
  setChoosenPokemon: Dispatch<any>,
}

export const PokemonList: React.FC<Props> = memo(({ pokemons, setChoosenPokemon }) => {
  return (
    <div className="pokemons-list">
      {pokemons && pokemons.map(pokemon => (
        <Pokemon 
          pokemon={pokemon}
          key={pokemon.name}
          setChoosenPokemon={setChoosenPokemon}
        />
      ))}
    </div>
  );
});
