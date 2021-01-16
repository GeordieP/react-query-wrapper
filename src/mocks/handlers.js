import { rest } from "msw";

export const handlers = [
  rest.get("/api/success", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        foo: "bar",
        bar: "baz",
      })
    );
  }),

  rest.get("/api/error", (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
