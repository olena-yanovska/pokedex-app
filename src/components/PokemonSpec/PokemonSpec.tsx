import React, { memo } from 'react';
import './PokemonSpec.scss';
import { PokemonData, Types } from '../../types/PokemonData';

interface Props {
  pokemon: PokemonData | null,
  setChoosenPokemon: (pokemon: PokemonData | null) => void,
}

export const PokemonSpec: React.FC<Props> = memo(({ pokemon }) => {

  const types = pokemon?.types.map(
    (pokemon: Types) => pokemon.type.name)
    .join(', ');

    let imageUrl = './pokemon-default.png';

    if (pokemon?.sprites.other.dream_world.front_default) {
      imageUrl = pokemon?.sprites.other.dream_world.front_default;
    }

  return (
    <div>
      {pokemon && (
        <div className='pokemon-spec'>
          <img
            src={imageUrl}
            alt={pokemon?.name}
            className="pokemon-spec__image"
          />

          <div className="pokemon-spec__details">
            <h1 className="pokemon-spec__name">
              {pokemon?.name + ` #${String(pokemon.id).padStart(3, '0')}`}
            </h1>

            <table className="pokemon-table">
              <tbody>
                <tr>
                  <td className="pokemon-table__title">Type</td>
                  <td className="pokemon-table__value pokemon-table__types">{types}</td>
                </tr>

                <tr>
                  <td className="pokemon-table__title">Attack</td>
                  <td className="pokemon-table__value">{pokemon?.stats[1].base_stat}</td>
                </tr>

                <tr>
                  <td className="pokemon-table__title">Defense</td>
                  <td className="pokemon-table__value">{pokemon?.stats[2].base_stat}</td>
                </tr>

                <tr>
                  <td className="pokemon-table__title">HP</td>
                  <td className="pokemon-table__value">{pokemon?.stats[0].base_stat}</td>
                </tr>

                <tr>
                  <td className="pokemon-table__title">SP Attack</td>
                  <td className="pokemon-table__value">{pokemon?.stats[3].base_stat}</td>
                </tr>

                <tr>
                  <td className="pokemon-table__title">SP Defense</td>
                  <td className="pokemon-table__value">{pokemon?.stats[4].base_stat}</td>
                </tr>

                <tr>
                  <td className="pokemon-table__title">Speed</td>
                  <td className="pokemon-table__value">{pokemon?.stats[5].base_stat}</td>
                </tr>


                <tr>
                  <td className="pokemon-table__title">Weight</td>
                  <td className="pokemon-table__value">{pokemon?.weight}</td>
                </tr>

                <tr>
                  <td className="pokemon-table__title">Total moves</td>
                  <td className="pokemon-table__value">{pokemon?.moves.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
});
