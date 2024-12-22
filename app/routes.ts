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
      route("logout", "routes/auth/logout.tsx"),
      route("register", "routes/auth/register.tsx"),
    ]),

    ...prefix("food-items", [
      index("routes/food-items.tsx"),
      route(":slug", "routes/food-item.tsx"),
    ]),

    ...prefix("food-categories", [
      index("routes/food-categories/index.tsx"),
      layout("routes/food-categories/layout.tsx", [
        route(":category", "routes/food-categories/category.tsx"),
        route(":category/food-items", "routes/food-categories/food-items.tsx"),
      ]),

      ...prefix("dashboard", [
        index("routes/dashboard/index.tsx"),
        route("settings", "routes/dashboard/settings.tsx"),
      ]),

      // nested routes for testing
      route("apa", "routes/food-categories/apa.tsx", [
        route("test", "routes/food-categories/test.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
