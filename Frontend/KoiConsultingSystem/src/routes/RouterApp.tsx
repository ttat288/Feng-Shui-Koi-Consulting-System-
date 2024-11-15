import { DefaultLayout } from "../layouts";
import Dashboard from "../layouts/AdminLayout";
import UserReports from "../pages/Admin/Dashboard";
import Login from "../pages/Login";
import Newest from "../pages/Newest";
import BlogDetail from "../pages/Newest/BlogDetail"; // Tạo component BlogDetail
import Register from "../pages/Register";
import UserInfo from "../pages/User";

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
  { path: "/user/", component: UserInfo, layout: DefaultLayout }, // Sử dụng component: BlogDetail

  { path: "/admin", component: UserReports, layout: Dashboard },
];

export const privateRoutes: RouteItem[] = [
  { path: "/admin", component: UserReports, layout: Dashboard },
];
