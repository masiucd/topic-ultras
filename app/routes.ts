import {type RouteConfig, index, layout, route} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("food-items", "routes/food-items.tsx"),
  layout("routes/_auth.tsx", [
    route("login", "routes/_auth.login.tsx"),
    route("register", "routes/_auth.register.tsx"),
  ]),
  // route("register", "routes/_auth.register.tsx"),
] satisfies RouteConfig;
