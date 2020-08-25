## React Suspense

In order to code split, we can use lazy load components. This is done using `dynamic import` statements. The `dynamic import` returns a Promise. The returned Promise is passed to `React.lazy()`. When the promise is being resolved(pending), a fallback UI has to passed. This is done, by wrapping the Lazy loaded component in <React.Suspense/>, like

```
const LazyComponent=React.lazy(()=>import('component_path'))
...
<React.Suspense fallback="fallbackLoadingComponent">
   <LazyComponent/>
</React.Suspense>
```

### Error Boundaries

When dynamically importing things, it may either succeed(resolve) or fail(reject). In order to gracefully handle errors we can use ErrorBoundaries. As to Suspense we call also provide custom error handlers, by passing fallbacks.

ErrorBoundaries are class components, with `componentDidCatch()` life cycle method. A single ErrorBoundary would suffice for an entire app. It is advice to keep ErrorBoundary closer to the code, that may fail. In that case, rest of the app is unaffected and the error code is replaced by fallback.

```
<ErrorBoundary fallback='fallbackErrorComponent'>
   <React.Suspense fallback="fallbackLoadingComponent">
      <LazyComponent/>
   </React.Suspense>
</ErrorBoundary>
```

#### React.lazy()

As always, a Promise can have 3 state:

- pending
- resolved
- rejected

If `pending`, the _fallbackLoadingComponent_ of <React.Suspense/> is displayed.
When the Promise gets `resolved`, the actual component is mounted.
For `rejected` cases, _fallbackErrorComponent_ of <ErrorBoundary/> is used.

### Suspense fetch

While fetching external they are also returning Promises. Which React.Suspense we can also handle them as we handled dynamic imports.

```
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
```

### Concurrent mode

In order to switch to concurrent mode

```
yarn upgrade react@experimental react-dom@experimental
```

`index.js`
```
...
const rootElement = document.getElementById('root');

ReactDOM.unstable_createRoot(rootElement).render(<App />);
```
