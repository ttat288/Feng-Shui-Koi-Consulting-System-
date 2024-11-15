import { DefaultLayout } from "../layouts";
import UserReports from "../pages/Admin/Dashboard";
import Login from "../pages/Login";
import Newest from "../pages/Newest";
import BlogDetail from "../pages/Newest/BlogDetail"; // Create BlogDetail component
import Register from "../pages/Register";
import UserInfo from "../pages/User";

interface RouteItem {
  path: string;
  component: React.ComponentType<any>;
  layout?: React.ComponentType<any> | null;
}

export const publicRoutes: RouteItem[] = [
  { path: "/", component: Newest, layout: DefaultLayout },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/newest/:title", component: BlogDetail, layout: DefaultLayout },
  { path: "/user/", component: UserInfo, layout: DefaultLayout },
  { path: "/admin", component: UserReports, layout: null },
];

export const adminRoutes = [
  { path: "/admin", component: UserReports, layout: null },
];
