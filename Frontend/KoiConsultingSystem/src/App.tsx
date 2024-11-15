import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DefaultLayout, NullLayout } from "./layouts";
import { adminRoutes, publicRoutes } from "./routes/RouterApp";
import { DataProvider } from "./store/DataContext";

function App(): JSX.Element {
  return (
    <>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              {publicRoutes.map((route, index) => {
                const Layout =
                  route.layout === null
                    ? NullLayout
                    : route.layout || DefaultLayout;

                const Page = route.component;

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}

              {/* Admin Routes */}
              {adminRoutes.map((route, index) => {
                const Layout =
                  route.layout === null
                    ? NullLayout
                    : route.layout || DefaultLayout;

                const Page = route.component;

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </Router>
      </DataProvider>
      <ToastContainer />
    </>
  );
}

export default App;
