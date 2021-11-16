import { Button, Result } from "antd";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.less";
import Layout from "./components/Layout/Layout";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import GlobalStyles from "./components/UI/GlobalStyles";
import { FilterProvider } from "./contexts/filter-context";
import AddEditProductPage from "./pages/AddEditProductPage";
import AllProductPage from "./pages/AllProductPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderAdminPage from "./pages/OrderAdminPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProductAdminPage from "./pages/ProductAdminPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import SuccessOrderPage from "./pages/SuccessOrderPage";
import UserAdminPage from "./pages/UserAdminPage";
import UserAdminUpdatePage from "./pages/UserAdminUpdatePage";

function App() {
  const history = useHistory();

  return (
    <div className="font-mont bg-main-bg">
      <GlobalStyles>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/category">
              <CategoryPage />
            </Route>

            <Route path="/products" exact>
              <FilterProvider>
                <AllProductPage />
              </FilterProvider>
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

            <PrivateRoute
              path="/checkout/shipping"
              redirectPath="/login?redirect=checkout/shipping"
            >
              <ShippingPage />
            </PrivateRoute>

            <PrivateRoute
              path="/checkout/placeorder"
              redirectPath="/login?redirect=checkout/placeorder"
            >
              <PlaceOrderPage />
            </PrivateRoute>

            <PrivateRoute path="/checkout/success" redirectPath="/login">
              <SuccessOrderPage />
            </PrivateRoute>
            <AdminRoute path="/admin/user-list" redirectPath="/login?redirect=admin/user-list">
              <UserAdminPage />
            </AdminRoute>
            <AdminRoute path="/admin/product-list" redirectPath="login">
              <ProductAdminPage />
            </AdminRoute>

            <AdminRoute path="/admin/order-list" redirectPath="login">
              <OrderAdminPage />
            </AdminRoute>

            <AdminRoute path="/admin/users/:id/edit" redirectPath="login">
              <UserAdminUpdatePage />
            </AdminRoute>

            <AdminRoute path="/admin/orders/:id/" redirectPath="login">
              <OrderDetailPage />
            </AdminRoute>

            <AdminRoute path="/admin/products/:id" redirectPath="login">
              <AddEditProductPage />
            </AdminRoute>
            <Route path="*">
              <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn vừa truy cập không tồn tại"
                extra={
                  <Button onClick={() => history.push("/")} type="primary">
                    Quay về trang chủ
                  </Button>
                }
              />
            </Route>
          </Switch>
        </Layout>
      </GlobalStyles>
    </div>
  );
}

export default App;
