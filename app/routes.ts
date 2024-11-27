import {
  type RouteConfig,
  index,
  route,
  // layout
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("food-items", "routes/food-items.tsx"),
] satisfies RouteConfig;
