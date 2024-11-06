import { DefaultLayout } from "../layouts";
import Login from "../pages/Login";
import Newest from "../pages/Newest";
import Register from "../pages/Register";

interface RouteItem {
  path: string;
  component: () => JSX.Element;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Newest, layout: DefaultLayout },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
];

export const privateRoutes: RouteItem[] = [];
