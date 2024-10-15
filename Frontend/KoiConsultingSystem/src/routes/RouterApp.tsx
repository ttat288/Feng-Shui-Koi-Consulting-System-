import { DefaultLayout } from "../layouts";
import Newest from "../pages/Newest";

interface RouteItem {
  path: string;
  component: () => JSX.Element;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Newest, layout: DefaultLayout },
];

export const privateRoutes: RouteItem[] = [];
