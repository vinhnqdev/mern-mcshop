import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.less";
import Layout from "components/Layout/Layout";
import AdminRoute from "components/PrivateRoutes/AdminRoute";
import PrivateRoute from "components/PrivateRoutes/PrivateRoute";
import GlobalStyles from "components/UI/GlobalStyles";
import Loading from "components/UI/Loading";
import routes from "./pages/routes";

const App = () => {
  return (
    <div className="font-mont bg-main-bg">
      <GlobalStyles>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map(({ component: Component, publicRoute, isAdmin, ...rest }, index) => {
                return publicRoute ? (
                  <Route {...rest} key={index}>
                    <Component />
                  </Route>
                ) : !isAdmin ? (
                  <PrivateRoute {...rest} key={index}>
                    <Component />
                  </PrivateRoute>
                ) : (
                  <AdminRoute {...rest} key={index}>
                    <Component />
                  </AdminRoute>
                );
              })}
            </Switch>
          </Suspense>
        </Layout>
      </GlobalStyles>
    </div>
  );
};

export default App;
