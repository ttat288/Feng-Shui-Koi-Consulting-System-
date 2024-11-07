import { DefaultLayout } from "../layouts";
import Login from "../pages/Login";
import Newest from "../pages/Newest";
import Register from "../pages/Register";
import BlogDetail from "../pages/Newest/BlogDetail"; // Tạo component BlogDetail

interface RouteItem {
  path: string;
  component: () => JSX.Element;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Newest, layout: DefaultLayout },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/newest/:title", component: BlogDetail, layout: DefaultLayout }, // Sử dụng component: BlogDetail
];

export const privateRoutes: RouteItem[] = [];
