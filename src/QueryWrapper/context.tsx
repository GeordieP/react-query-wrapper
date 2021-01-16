import * as React from "react";
import { QueryObserverResult } from "react-query";

// Imports
// ----------------------
// Util

const computeLoading = (queries: TQueries) => {
  const mut_out: TLoadingState = {
    is: false,
    which: [],
  };

  const entries = Object.entries(queries);
  for (const [key, value] of entries) {
    if (!value.isLoading) continue;

    mut_out.is = true;
    mut_out.which = [...mut_out.which, key];
  }

  return mut_out;
};

const computeError = (queries: TQueries) => {
  const mut_out: TErrorState = {
    is: false,
    errors: {},
  };

  const entries = Object.entries(queries);
  for (const [key, value] of entries) {
    if (!value.isError) continue;

    mut_out.is = true;

    if (value.error instanceof Error) {
      mut_out.errors[key] = value.error;
    } else if ((value as any).error.message != null) {
      mut_out.errors[key] = new Error((value.error as any).message as string); // TODO:HACK: not guaranteed to be string
    } else {
      mut_out.errors[key] = new Error(value.error as string); // TODO:HACK: not guaranteed to be string
    }
  }

  return mut_out;
};

// Util
// ----------------------
// Context

const QueryWrapperContext = React.createContext<TState | undefined>(undefined);

const QueryWrapperProvider: React.FC<QueryWrapperProviderProps> = ({
  children,
  queries,
}) => {
  const loading = computeLoading(queries);
  const error = computeError(queries);
  const success = !loading.is && !error.is;

  const state = {
    loading,
    error,
    success,
  };

  return (
    <QueryWrapperContext.Provider value={state}>
      {children}
    </QueryWrapperContext.Provider>
  );
};

const useQueryWrapperResult = () => {
  const ctx = React.useContext(QueryWrapperContext);

  if (ctx === undefined) {
    throw new Error(
      "useQueryWrapperResult must be used within a QueryWrapperProvider"
    );
  }

  return ctx;
};

export { QueryWrapperProvider, useQueryWrapperResult };

// Context
// ----------------------
// Types

type TQueries = Record<string, QueryObserverResult>;

interface QueryWrapperProviderProps {
  queries: TQueries;
}

type TLoadingState = { is: boolean; which: string[] };
type TErrorState = { is: boolean; errors: Record<string, Error> };
type TState = {
  loading: TLoadingState;
  error: TErrorState;
  success: boolean;
};
