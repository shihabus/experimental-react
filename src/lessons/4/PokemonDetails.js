import React from 'react';

function suspenseFetch(promise) {
  let status = 'pending';
  let result = null;

  let suspender = promise.then(
    response => {
      // assign the values to global variable
      status = 'success';
      result = response;
    },
    error => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      // pending
      if (status === 'pending') throw suspender;

      // rejected
      if (status === 'error') throw result;

      // resolved
      if (status === 'success') return result;
    }
  };
}

let pokemon = suspenseFetch(
  fetch('https://pokeapi.co/api/v2/pokemon/1').then(res => res.json())
);

export default function PokemonDetails() {
  return (
    <div>
      <p>{pokemon.read().name}</p>
    </div>
  );
}
