import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

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

          <Route path="*">Not Found</Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
