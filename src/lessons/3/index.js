import React from 'react';
// import PokemonDetails from './PokemonDetails'
// dynamic import using React.lazy
import ErrorBoundary from '../../common/ErrorBoundary';

// rejected
// const LazyPokemonDetails = React.lazy(() => Promise.reject())

// loading
// const LazyPokemonDetails = React.lazy(() => new Promise(() => {
//    setTimeout(() => { }, 1000)
// }))

// resolved
const LazyPokemonDetails = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            default: () => <div>Resolved</div>
          }),
        1000
      );
    })
);

// resolved
// const LazyPokemonDetails = React.lazy(() => Promise.resolve({ default: () => <div>Instantaneous Resolved</div> }))

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
