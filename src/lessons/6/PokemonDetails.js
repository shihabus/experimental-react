import React from 'react';
import { suspenseFetch, fetchPokemon } from '../../api';

let initialPokemon = suspenseFetch(fetchPokemon(1));

function DelaySpinner() {
  return (
    <span role="img" aria-label="spinner" className="DelaySpinner">
      <style>{`
        .DelaySpinner {
          animation: rotation 1.5s infinite linear;
          display: inline-block;
          font-size: .7rem
        }
        @keyframes rotation {
          from { transform: rotate(0deg) }
          to { transform: rotate(359deg) }
        }
      `}</style>
      🌀
    </span>
  );
}

export default function PokemonDetails() {
  const [pokemonResource, setPokemonResource] = React.useState(initialPokemon);
  // how long we have to waiting before showing Suspense fallback
  // if the new state appears before that update it
  // isPending is true if the button is clicked and waiting for state update
  const [startTransition, isPending] = React.useTransition({ timeoutMs: 1000 });

  const pokemon = pokemonResource.read();
  return (
    <div>
      <p>{pokemon.name} {isPending && <DelaySpinner />}</p>
      <div>
        <button
          disabled={isPending}
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
