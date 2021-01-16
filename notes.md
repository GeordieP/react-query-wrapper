# Notes

- Loading and Error components provide different rendering strategies. Example for Loading:

  ### 1. Default

  > Renders a default loading spinner provided by the library

  ```jsx
  <RenderQuery.Loading />
  ```

  ### 2. Children

  > Renders anything given as children

  ```jsx
  <RenderQuery.Loading>
    <p>Custom loading message</p>
  </RenderQuery.Loading>
  ```

  ### 3. Function as children

  > Calls child function with `queries: { name: string, loading: boolean }[]`, allowing us to render loading spinners for each query individually

  ```jsx
  <RenderQuery.Loading>
    {({ queries }) =>
      queries.map((q) => {
        if (q.loading) return <p>{q.name} 🔄</p>;
        return <p>{q.name} ✅</p>;
      })
    }
  </RenderQuery.Loading>
  ```

- Composes well; project-wide custom loading/error components are possible - they don't have to be defined within the child scope of a RenderQuery

  ```jsx
  // components/loading.jsx
  export default () => (
    <RenderQuery.Loading>
      <p>Custom loading spinner graphics</p>
    </RenderQuery.Loading>
  );
  ```

  ```jsx
  // pages/somePage.jsx
  import CustomLoader from "components/loading";

  export default () => (
    <RenderQuery>
      <CustomLoader />
      ...
    </RenderQuery>
  );
  ```

- RenderQuery theoretically supports nesting (TOOD: test this);
  - Example case:
    - Top-level RenderQuery with page layout inside, accepts one query which ends up as header text (e.g. user name?) on success
    - Nested RenderQuery accepts 1/many other queries for page data, renders them with a separate loading/error/success context
      - This means an error in the nested RenderQuery doesn't prevent the top-level from rendering success (and vice versa)
    - Top-level query data is still in scope if needed
