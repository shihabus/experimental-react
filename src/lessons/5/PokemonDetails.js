import React from 'react';
import { suspenseFetch, fetchPokemon } from '../../api';

let initialPokemon = suspenseFetch(fetchPokemon(1));

export default function PokemonDetails() {
  const [pokemonResource, setPokemonResource] = React.useState(initialPokemon);
  const pokemon = pokemonResource.read();
  return (
    <div>
      <p>{pokemon.name}</p>
      <div>
        <button
          type='button'
          onClick={function () {
            const resp = suspenseFetch(fetchPokemon(pokemon.id + 1));
            setPokemonResource(resp);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
