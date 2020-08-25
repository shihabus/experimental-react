import React from 'react';
import { suspenseFetch, fetchPokemon } from '../../api';

let initialPokemon = suspenseFetch(fetchPokemon(1));

export default function PokemonDetails() {
  const [pokemonResource, setPokemonResource] = React.useState(initialPokemon);
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 3000
  });
  console.log('isPending', isPending);
  const pokemon = pokemonResource.read();
  return (
    <div>
      <p>{pokemon.name}</p>
      <div>
        <button
          type='button'
          onClick={() => {
            startTransition(() =>
              setPokemonResource(suspenseFetch(fetchPokemon(pokemon.id + 1)))
            );
          }}
        >
          Next
        </button>
      </div>
    </div >
  );
}
