export function suspenseFetch(promise) {
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

export function fetchPokemon(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res =>
    res.json()
  );
}
