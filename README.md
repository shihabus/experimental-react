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

ReactDOM.createRoot(rootElement).render(<App />);
```

### [useTransition Hook](https://reactjs.org/docs/concurrent-mode-patterns.html#wrapping-setstate-in-a-transition)

When updating UI long tasks will always block the thread. This can hinder the user experiment and user might feel a jittery effect.

React have come up with a new hook called `useTransition` which allow the user to de-prioritize UI updates. This allow to create something similar to concurrent UI.

Suppose if you have an API call that has to update the state. The UI is blocked when the fetching in progress. By using, `useTransition` one can let React know that, this update is not important, and it can be deferred/delayed.

```
const [startTransition,isPending]=useTransition({ timeoutMs:x })
```

### useDeferred Value

When you want to hold on to the current value for an explicit time