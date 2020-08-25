import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary';
const LazyPokemonDetails = React.lazy(() => import('./PokemonDetails'));

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
