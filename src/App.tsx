import { useQuery } from "react-query";
import "./App.css";
import QueryWrapper from "./QueryWrapper";

const successFetcher = () =>
  fetch("/api/success").then<TResponse>((x) => x.json());
const errorFetcher = () => fetch("/api/error").then((x) => x.json());
const slowFetcher = () =>
  new Promise<TResponse>((r) => setTimeout(() => r(successFetcher()), 3000));

function App() {
  const someResource = useQuery<TResponse>("someResource", slowFetcher);
  const otherResource = useQuery<TResponse>("otherResource", successFetcher);

  return (
    <div className="App">
      <QueryWrapper queries={{ someResource, otherResource }}>
        {/* render default or custom error content */}
        <QueryWrapper.Error />
        {/* <QueryWrapper.Error>
          <p>Generic error message</p>
        </QueryWrapper.Error> */}

        {/* --> any markup outside of result components is always rendered;
                useful for headers, page styling/wrappers, etc */}
        <h1>Results</h1>

        {/* render default or custom loading content */}
        {/*<QueryWrapper.Loading /> */}
        <QueryWrapper.Loading>
          <p>Custom Loading Spinner</p>
        </QueryWrapper.Loading>

        {/* ALL queries must succeed for this to render */}
        <QueryWrapper.Success>
          <h4>Resources loaded</h4>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </QueryWrapper.Success>
      </QueryWrapper>
    </div>
  );
}

export default App;

// Types

type TResponse = { foo: string; bar: string };
