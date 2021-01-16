import { useQuery } from "react-query";
import "./App.css";
import RenderQuery from "./RenderQuery";

const successFetcher = () =>
  fetch("/api/success").then<TResponse>((x) => x.json());
// eslint-disable-next-line
const errorFetcher = () => fetch("/api/error").then((x) => x.json());
const slowFetcher = () =>
  new Promise<TResponse>((r) => setTimeout(() => r(successFetcher()), 3000));
const slowerFetcher = () =>
  new Promise<TResponse>((r) => setTimeout(() => r(successFetcher()), 5000));

function App() {
  return (
    <div className="App">
      <h1>Basic Usage</h1>
      <Basic />
      <hr />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          textAlign: "left",
        }}
      >
        <div>
          <h1>Custom Loading</h1>
          <CustomLoading />
        </div>

        <div>
          <h1>Advanced Loading</h1>
          <AdvancedLoading />
        </div>
      </div>
      <hr />

      <h1>Basic/Default Error</h1>
      <DefaultError />
      <hr />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          textAlign: "left",
        }}
      >
        <div>
          <h1>Custom Error</h1>
          <CustomError />
        </div>

        <div>
          <h1>Advanced Error</h1>
          <AdvancedError />
        </div>
      </div>
    </div>
  );
}

export default App;

const Basic = () => {
  const someResource = useQuery<TResponse>("basicResourceSlow", slowFetcher);
  const otherResource = useQuery<TResponse>(
    "basicResourceSuccess",
    successFetcher
  );

  return (
    <div className="App">
      <RenderQuery queries={{ someResource, otherResource }}>
        <RenderQuery.Error />
        <RenderQuery.Loading />

        <RenderQuery.Success>
          <p>Done loading!</p>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </RenderQuery.Success>
      </RenderQuery>
    </div>
  );
};

const CustomLoading = () => {
  const someResource = useQuery<TResponse>(
    "customLoadingSlowResource",
    slowFetcher
  );
  const otherResource = useQuery<TResponse>(
    "customLoadingOtherResource",
    successFetcher
  );

  return (
    <div className="App">
      <RenderQuery queries={{ someResource, otherResource }}>
        <RenderQuery.Error />
        <RenderQuery.Loading>Custom loading spinner</RenderQuery.Loading>

        <RenderQuery.Success>
          <p>Done loading!</p>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </RenderQuery.Success>
      </RenderQuery>
    </div>
  );
};

const AdvancedLoading = () => {
  const someResource = useQuery<TResponse>(
    "advancedLoadingSlowResource",
    slowFetcher
  );
  const otherResource = useQuery<TResponse>(
    "advancedLoadingSlowerResource",
    slowerFetcher
  );

  return (
    <div className="App">
      <RenderQuery queries={{ someResource, otherResource }}>
        <RenderQuery.Error />

        <ul>
          <RenderQuery.Loading>
            {({
              loadingQueries,
            }: {
              loadingQueries: CurrentlyLoadingQueries;
            }) =>
              loadingQueries.map((q) => (
                <li>
                  [{q.isLoading ? "🔄" : "✅"}] {q.name}
                </li>
              ))
            }
          </RenderQuery.Loading>
        </ul>

        <RenderQuery.Success>
          <p>Done loading!</p>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </RenderQuery.Success>
      </RenderQuery>
    </div>
  );
};

const DefaultError = () => {
  const someResource = useQuery<TResponse>(
    "defaultErrorSlowResource",
    slowFetcher
  );
  const otherResource = useQuery<TResponse>(
    "defaultErrorFailedResource",
    errorFetcher
  );

  return (
    <div className="App">
      <RenderQuery queries={{ someResource, otherResource }}>
        <RenderQuery.Error />

        <RenderQuery.Loading />

        <RenderQuery.Success>
          <p>Done loading!</p>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </RenderQuery.Success>
      </RenderQuery>
    </div>
  );
};

const CustomError = () => {
  const someResource = useQuery<TResponse>(
    "customErrorSlowResource",
    slowFetcher
  );
  const otherResource = useQuery<TResponse>(
    "customErrorFailedResource",
    errorFetcher
  );

  return (
    <div className="App">
      <RenderQuery queries={{ someResource, otherResource }}>
        <RenderQuery.Error>Encountered an error</RenderQuery.Error>

        <RenderQuery.Loading />

        <RenderQuery.Success>
          <p>Done loading!</p>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </RenderQuery.Success>
      </RenderQuery>
    </div>
  );
};

const AdvancedError = () => {
  const someResource = useQuery<TResponse>(
    "advancedErrorSlowResource",
    slowFetcher
  );
  const otherResource = useQuery<TResponse>(
    "advancedErrorFailedResource",
    errorFetcher
  );

  return (
    <div className="App">
      <RenderQuery queries={{ someResource, otherResource }}>
        <ul>
          <RenderQuery.Error>
            {({ errors }: { errors: Array<[name: string, error: Error]> }) => {
              return errors.map(([name, e]) => (
                <li>
                  Error when loading {name}: {e.message}
                </li>
              ));
            }}
          </RenderQuery.Error>
        </ul>
        <RenderQuery.Loading />

        <RenderQuery.Success>
          <p>Done loading!</p>
          <p>{someResource.data?.foo}</p>
          <p>{someResource.data?.bar}</p>
          <p>{otherResource.data?.foo}</p>
        </RenderQuery.Success>
      </RenderQuery>
    </div>
  );
};

// Types

type TResponse = { foo: string; bar: string };
