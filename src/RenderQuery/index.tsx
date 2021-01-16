import * as React from "react";
import { RenderQueryProvider, useRenderQuery } from "./context";

const RenderQuery: TRenderQuery = (props) => {
  return (
    <RenderQueryProvider queries={props.queries}>
      <>{props.children}</>
    </RenderQueryProvider>
  );
};

const Success: React.FC = (props) => {
  const renderQuery = useRenderQuery();
  if (!renderQuery.success) return null;

  return <>{props.children}</>;
};

const Loading: React.FC = (props) => {
  const renderQuery = useRenderQuery();
  if (!renderQuery.loading.is) return null;

  if (props.children == null)
    return (
      <>
        <div>Loading Spinner...</div>
      </>
    );

  return <>{props.children}</>;
};

const Err: React.FC = (props) => {
  const renderQuery = useRenderQuery();
  if (!renderQuery.error.is) return null;

  const errorEntries = Object.entries(renderQuery.error.errors!);

  // default error UI - each failed query rendered with its query name and message
  // TODO: should this instead use the actual react-query query key?
  if (props.children == null)
    return (
      <>
        <h4>Errors:</h4>
        {errorEntries.map(([queryName, value]) => (
          <p>
            <b>[Error][{queryName}] </b>
            {value.message}
          </p>
        ))}
      </>
    );

  if ({}.toString.call(props.children) === "[object Function]") {
    return (props.children as Function)({ errors: errorEntries }); // TODO: better typing of function as child
  }

  return <>{props.children}</>;
};

RenderQuery.Loading = Loading;
RenderQuery.Success = Success;
RenderQuery.Error = Err;

export default RenderQuery;
