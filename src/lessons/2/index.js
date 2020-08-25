import React from 'react';
// import PokemonDetails from './PokemonDetails'
// dynamic import using React.lazy
import ErrorBoundary from '../../common/ErrorBoundary';
const LazyPokemonDetails = React.lazy(() => Promise.reject());

export default function index() {
  return (
    <div>
      <h1>Pokedex</h1>
      {/* <PokemonDetails /> */}
      <ErrorBoundary fallback="Oops....Can't catch 'em all">
        <React.Suspense fallback='Loading....'>
          <LazyPokemonDetails />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}
