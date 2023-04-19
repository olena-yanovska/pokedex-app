import React, { Dispatch, memo } from 'react';
import cn from 'classNames';
import './Pokemon.scss';
import { Colors } from '../../types/Colors';

interface Props {
  pokemon: any,
  setChoosenPokemon: Dispatch<any>,
}

export const Pokemon: React.FC<Props> = memo(({ pokemon, setChoosenPokemon }) => {
  let imageUrl = './pokemon-default.png';

  if (pokemon.sprites?.other.dream_world.front_default) {
    imageUrl = pokemon.sprites?.other.dream_world.front_default;
  }
  
  return (
    <div 
      className="pokemon-card" 
      onClick={() => setChoosenPokemon(pokemon)}
    >
      <img
        className="pokemon-card__image"
        src={imageUrl}
        alt={pokemon.name}
      />
      <div className='pokemon-card__name'>{pokemon.name}</div>
      <div className='pokemon-card__types'>
        {pokemon.types.map((pokemon: any) => {
          return (
            <button 
              className={cn(
                'button is-static pokemon-card__type',
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
});
