import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),

  layout("routes/auth.tsx", [
    route("login", "routes/auth.login.tsx"),
    route("register", "routes/auth.register.tsx"),
  ]),

  ...prefix("food-items", [
    index("routes/food-items.tsx"),
    route(":food-item", "routes/food-item.tsx"),
  ]),
] satisfies RouteConfig;
