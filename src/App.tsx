import { useQuery } from "react-query";
import "./App.css";
import RenderQuery from "./RenderQuery";

const successFetcher = () =>
  fetch("/api/success").then<TResponse>((x) => x.json());
// eslint-disable-next-line
const errorFetcher = () => fetch("/api/error").then((x) => x.json());
const slowFetcher = () =>
  new Promise<TResponse>((r) => setTimeout(() => r(successFetcher()), 3000));

function App() {
  const someResource = useQuery<TResponse>("someResource", slowFetcher);
  const otherResource = useQuery<TResponse>("otherResource", successFetcher);

  return (
    <div className="App">
      <RenderQuery queries={{ someResource, otherResource }}>
        {/* render default or custom error content */}
        <RenderQuery.Error />
        {/* <RenderQuery.Error>
          <p>Generic error message</p>
        </RenderQuery.Error> */}

        {/* --> any markup outside of result components is always rendered;
                useful for headers, page styling/wrappers, etc */}
        <h1>Results</h1>

        {/* render default or custom loading content */}
        {/*<RenderQuery.Loading /> */}
        <RenderQuery.Loading>
          <p>Custom Loading Spinner</p>
        </RenderQuery.Loading>

        {/* ALL queries must succeed for this to render */}
        <RenderQuery.Success>
          <h4>Resources loaded</h4>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </RenderQuery.Success>
      </RenderQuery>
    </div>
  );
}

export default App;

// Types

type TResponse = { foo: string; bar: string };
