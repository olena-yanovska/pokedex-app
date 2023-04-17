import React from 'react';
import './PokemonList.css';
import { PokemonListData } from '../../types/PokemonListData';
import { Pokemon } from '../Pokemon/Pokemon';

interface Props {
  pokemons: PokemonListData[],
}

export const PokemonList: React.FC<Props> = ({ pokemons }) => {
  return (
    <div className="pokemons-list">
      {pokemons && pokemons.map(pokemon => (
        <Pokemon pokemon={pokemon}/>
      ))}
    </div>
  );
};
