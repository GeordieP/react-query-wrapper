declare interface RenderQueryQueries
  extends Record<string, QueryObserverResult> {}

interface CurrentlyLoadingQueries
  extends Array<{ name: string; isLoading: boolean }> {}

declare interface RenderQueryLoadingState {
  is: boolean;
  which: CurrentlyLoadingQueries;
}

declare interface RenderQueryErrorState {
  is: boolean;
  errors: Record<string, Error>;
}

declare interface RenderQueryState {
  loading: RenderQueryLoadingState;
  error: RenderQueryErrorState;
  success: boolean;
}

declare interface RenderQueryProps {
  queries: Record<string, QueryObserverResult>;
}

declare interface TRenderQuery extends React.FC<RenderQueryProps> {
  Loading: typeof Loading;
  Success: typeof Success;
  Error: typeof Err;
}
