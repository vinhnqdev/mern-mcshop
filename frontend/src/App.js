import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";

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

          <Route path="*">Not Found</Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
