import React, { Dispatch } from 'react';
import './Pokemon.css';

interface Props {
  pokemon: any,
  setChoosenPokemon: Dispatch<any>,
}

export const Pokemon: React.FC<Props> = ({ pokemon, setChoosenPokemon }) => {
  return (
    <div className="pokemon-card" onClick={() => setChoosenPokemon(pokemon)}>
      <img
        className="pokemon-image"
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
      />
      <div className='pokemon-name'>{pokemon.name}</div>
      <div className='pokemon-types'>
        {pokemon.types.map((pokemon: any) => {
          return (
            <button className="button is-success pokemon-type">{pokemon.type.name}</button>
          )
        })}
      </div>
    </div>
  );
};
