export interface PokemonData {
  id: number;
  name: string;
  sprites: Sprites;
  types: Types[];
  weight: number;
  moves: Move[];
  stats: Stats[];
  url: string;
}

export interface Sprites {
  front_default: string;
  other: Other;
  animated: {
    front_default: string;
  };
}

export interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export interface Other {
  'dream_world': {
    'front_default': string;
  }
}

export interface Move {
  move: {
    name: string;
    url: string;
  }
}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}
