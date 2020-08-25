import React from 'react';
// import PokemonDetails from './PokemonDetails'
// dynamic import using React.lazy
const LazyPokemonDetails = React.lazy(() => import('./PokemonDetails'));

export default function index() {
  return (
    <div>
      <h1>Pokedex</h1>
      {/* <PokemonDetails /> */}
      <React.Suspense fallback='Loading....'>
        <LazyPokemonDetails />
      </React.Suspense>
    </div>
  );
}
