import React, { memo } from 'react';
import cn from 'classNames';
import './Filter.scss';
import { Colors } from '../../types/Colors';

interface Props {
  setActiveType: (types: string) => void;
}

const options = [
  'all',
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

export const Filter: React.FC<Props> = memo(({ setActiveType }) => {
  return (
    <div className="filter">
      <div>
        <p className='filter__description'>Filter by type:</p>
      </div>

      <div className='filter__options'>
        {options.map((option) => {
          return (
            <button
              key={option}
              value={option}
              className={cn(
                'button filter__option',
                Colors[option]
              )}
              onClick={() => {
                if (option === 'all') {
                  setActiveType('');
                  console.log('option', option)
                } else {
                  setActiveType(option);
                  console.log('option', option)
                }
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
});
