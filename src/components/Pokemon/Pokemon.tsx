import React, { Dispatch } from 'react';
import cn from 'classNames';
import './Pokemon.scss';
import { Colors } from '../../types/Colors';

interface Props {
  pokemon: any,
  setChoosenPokemon: Dispatch<any>,
}

export const Pokemon: React.FC<Props> = ({ pokemon, setChoosenPokemon }) => {
  return (
    <div 
      className="pokemon-card" 
      onClick={() => setChoosenPokemon(pokemon)}
    >
      <img
        className="pokemon-image"
        src={pokemon.sprites?.other.dream_world.front_default}
        alt={pokemon.name}
      />
      <div className='pokemon-name'>{pokemon.name}</div>
      <div className='pokemon-types'>
        {pokemon.types.map((pokemon: any) => {
          return (
            <button 
              className={cn(
                'button is-static pokemon-type',
                Colors[pokemon.type.name]
              )}
              key={pokemon.type.name}
              id='pokemon-type'
            >
              {pokemon.type.name}
            </button>
          )
        })}
      </div>
    </div>
  );
};
