import axios from 'axios';
import { PokemonListData } from '../types/PokemonListData';
import { PokemonData } from '../types/PokemonData';

export const getPokemons = async (url: string): Promise<PokemonListData | undefined> => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch {
    console.log('Error with loading pokemon list');
  }
}

export const getPokemonData =async (url: string): Promise<PokemonData[] | undefined> => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch {
    console.log('Error with loading pokemon data');
  }
}
