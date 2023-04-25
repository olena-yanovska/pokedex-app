export interface PokemonListData {
  name: string;
  url: string;
  next: string;
  results: PokemonListData[];
}
