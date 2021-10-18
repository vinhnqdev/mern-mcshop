import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProductDetailPage from "./pages/ProductDetailPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="font-mont">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/products/:id">
            <ProductDetailPage />
          </Route>

          <Route path="/cart">
            <CartPage />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/register">
            <RegisterPage />
          </Route>

          <PrivateRoute path="/profile" redirectPath="/login?redirect=profile/edit">
            <ProfilePage />
          </PrivateRoute>

          <PrivateRoute path="/checkout/shipping" redirectPath="/login?redirect=checkout">
            <CheckoutPage />
          </PrivateRoute>

          <Route path="*">Not Found</Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
