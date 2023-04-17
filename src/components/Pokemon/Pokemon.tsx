import React from 'react';
import './Pokemon.css';

interface Props {
  pokemon: any,
}

export const Pokemon: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img
        className="pokemon-image"
        src={pokemon.sprites.front_default}
        alt=""
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
