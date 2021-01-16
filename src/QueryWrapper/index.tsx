import * as React from "react";
import { QueryObserverResult } from "react-query";
import { QueryWrapperProvider, useQueryWrapperResult } from "./context";

const QueryWrapper: TQueryWrapper = (props) => {
  return (
    <QueryWrapperProvider queries={props.queries}>
      <>{props.children}</>
    </QueryWrapperProvider>
  );
};

const Success: React.FC = (props) => {
  const queryWrapper = useQueryWrapperResult();
  if (!queryWrapper.success) return null;

  return <>{props.children}</>;
};

const Loading: React.FC = (props) => {
  const queryWrapper = useQueryWrapperResult();
  if (!queryWrapper.loading.is) return null;

  return (
    <>
      <div>Loading Spinner...</div>
    </>
  );
};

const Err: React.FC = (props) => {
  const queryWrapper = useQueryWrapperResult();
  if (!queryWrapper.error.is) return null;

  const errorEntries = Object.entries(queryWrapper.error.errors!);

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
};

QueryWrapper.Loading = Loading;
QueryWrapper.Success = Success;
QueryWrapper.Error = Err;

export default QueryWrapper;

interface QueryWrapperProps {
  queries: Record<string, QueryObserverResult>;
}

type TQueryWrapper = React.FC<QueryWrapperProps> & {
  Loading: typeof Loading;
  Success: typeof Success;
  Error: typeof Err;
};
