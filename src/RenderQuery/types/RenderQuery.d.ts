declare interface RenderQueryQueries
  extends Record<string, QueryObserverResult> {}

declare interface RenderQueryLoadingState {
  is: boolean;
  which: string[];
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
