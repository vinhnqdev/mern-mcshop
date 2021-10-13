import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { login, register } from "./app/userSlice";
import Layout from "./components/Layout/Layout";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  console.log(data);

  const handleLogin = () => {
    dispatch(
      login({
        email: "vinh@gmail.com",
        password: "vinh@123",
      })
    );
  };

  const handleRegister = () => {
    dispatch(
      register({
        name: "Test",
        email: "test@gmail.com",
        password: "test@123",
      })
    );
  };

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
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </Layout>
    </div>
  );
}

export default App;
