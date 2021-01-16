import { useQuery } from "react-query";
import "./App.css";

const QKeys = {
  someResource: "someResource",
};

const successFetcher = () =>
  fetch("/api/success").then<TResponse>((x) => x.json());
const errorFetcher = () => fetch("/api/error").then((x) => x.json());
const slowFetcher = () =>
  new Promise<TResponse>((r) => setTimeout(() => r(successFetcher()), 3000));

function App() {
  const someResource = useQuery<TResponse>(QKeys.someResource, slowFetcher);
  // const someResource = useQuery<TResponse>(QKeys.someResource, successFetcher);
  // const someResource = useQuery<TResponse>(QKeys.someResource, errorFetcher);

  return (
    <div className="App">
      <QueryWrapper queries={{ someResource }}>
        {/* render default or custom error content? */}
        {/* <QueryWrapper.Error /> */}
        <QueryWrapper.Error>
          {(errors: Error[]) => errors.map((e) => <p>Message: {e.message}</p>)}
        </QueryWrapper.Error>

        {/* any markup outside of querywrapper components should always render */}
        <h1>Results</h1>

        {/* render default or custom loading content? */}
        {/* <QueryWrapper.Loading /> */}
        <QueryWrapper.Loading>
          <p>Custom Loading Content...</p>
        </QueryWrapper.Loading>

        <QueryWrapper.Success>
          <h4>Resource loaded</h4>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
        </QueryWrapper.Success>
      </QueryWrapper>
    </div>
  );
}

export default App;

// Types

type TResponse = { foo: string; bar: string };
