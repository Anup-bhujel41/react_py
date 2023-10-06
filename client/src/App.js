import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import Blogs from "./components/blog/Blogs";
import BlogDetail from "./components/blog/BlogDetail";
import About from "./components/others/About";
import Contact from "./components/others/Contact";
import Privacy from "./components/others/Privacy";
import FAQ from "./components/others/FAQ";
import ProductDetail from "./components/product/ProductDetail";
import NotFound404 from "./components/others/NotFound404";
import ProductType from "./components/category/ProductType";
import Category from "./components/category/Category";
import ShopingCart from "./components/support/ShopingCart";
import Wishlist from "./components/dashboard/Wishlist";
import Checkout from "./components/support/Checkout";
import OrderCompleted from "./components/support/OrderCompleted";
import MyOrders from "./components/dashboard/MyOrders";
import Addresses from "./components/dashboard/Addresses";
import ProfileInfo from "./components/dashboard/ProfileInfo";
import AddAddress from "./components/dashboard/AddAddress";
import EditAddress from "./components/dashboard/EditAddress";
import SearchProduct from "./components/category/SearchProduct";
// import PaymentMethods from "./components/dashboard/PaymentMethods";
// import AddPaymentCard from "./components/dashboard/AddPaymentCard";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import CheckoutForm from "./components/support/CheckoutForm";

export default function App() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/shop">
        <Shop />
      </Route>
      <Route exact path="/blogs">
        <Blogs />
      </Route>

      {/* Authentication */}
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>

      {/* Dashboard Pages */}
      <Route exact path="/wishlist">
        <Wishlist />
      </Route>
      <Route exact path="/my-orders">
        <MyOrders />
      </Route>
      <Route exact path="/addresses">
        <Addresses />
      </Route>
      <Route exact path="/addresses/add-address">
        <AddAddress />
      </Route>
      <Route exact path="/addresses/edit-address/:id">
        <EditAddress />
      </Route>
      {/* <Route exact path="/payment-methods">
          <PaymentMethods />
        </Route>
        <Route exact path="/payment-methods/add-card">
          <AddPaymentCard />
        </Route> */}
      <Route exact path="/profile">
        <ProfileInfo />
      </Route>

      {/* Support Pages */}
      <Route exact path="/shoping-cart">
        <ShopingCart />
      </Route>
      <Route exact path="/checkout">
        <Checkout />
      </Route>
      <Route exact path="/complete-order">
        <OrderCompleted />
      </Route>

      <Route exact path="/checkout-form">
        <CheckoutForm/>
      </Route>

      {/* Other Pages */}
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/contact">
        <Contact />
      </Route>
      <Route exact path="/privacy">
        <Privacy />
      </Route>
      <Route exact path="/faq">
        <FAQ />
      </Route>

      {/* Slug Pages */}
      <Route exact path="/shop/:slug">
        <ProductType />
      </Route>
      <Route exact path="/category/:slug">
        <Category />
      </Route>
      <Route exact path="/product/:slug">
        <ProductDetail />
      </Route>
      <Route exact path="/blogs/:slug">
        <BlogDetail />
      </Route>
      <Route exact path="/search/:query">
        <SearchProduct />
      </Route>
      <Route path="*">
        <NotFound404 />
      </Route>
    </Switch>
  );
}
