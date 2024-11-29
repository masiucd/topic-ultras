import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/main-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),

    layout("routes/auth/layout.tsx", [
      route("login", "routes/auth/login.tsx"),
      route("register", "routes/auth/register.tsx"),
    ]),

    ...prefix("food-items", [
      index("routes/food-items.tsx"),
      route(":slug", "routes/food-item.tsx"),
    ]),

    ...prefix("food-categories", [
      index("routes/food-categories/categories.tsx"),
      route(":category", "routes/food-categories/category.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
