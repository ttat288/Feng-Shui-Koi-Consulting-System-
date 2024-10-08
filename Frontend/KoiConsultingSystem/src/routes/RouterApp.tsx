import Home from "../pages/Home";

interface RouteItem {
  path: string;
  component: () => JSX.Element;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Home, layout: null },
  // { path: "/newBranch", component: New },
];

export const privateRoutes: RouteItem[] = [];
