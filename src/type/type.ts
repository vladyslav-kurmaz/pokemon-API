export type TSimplePokemonData = {
  name: string;
  url: string;
};

export type TOtherSprites = {
  "official-artwork": {
    front_default: string;
  };
};

export type TPokemon = {
  name: string;
  sprites: { other: TOtherSprites };
  id: string;
};
