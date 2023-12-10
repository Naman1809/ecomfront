import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
// import axios from "./axios.config";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import NotFound from "./component/layout/NotFound/NotFound";

function App() {
 
  
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState();

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey); 
    } catch (error) {
      console.log("Login first")
    }
   
  }

  useEffect(() => {
    
    console.log()
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return( 
    <Router>
  
      <Header />
      {stripeApiKey && isAuthenticated && <UserOptions user={user} />}
      <Elements stripe={loadStripe(stripeApiKey)}>
        {/* <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/process/payment" element={<Payment />} />
          </Route>
        </Routes>
      </Elements> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/success" element={<OrderSuccess />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/products" element={<ProductList />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/users" element={<UsersList />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        </Route>

        <Route path="/" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
            <Route path="/process/payment" element={<Payment />} />
          </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Elements>
      <Footer />
    </Router>
    );


  
}

export default App;
