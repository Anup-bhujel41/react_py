import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
// import BottomFeatures from "../base/BottomFeatures";
import TopBarHeader from "../base/TopBarHeader";
import TopCategory from "./components/TopCategory";
import ProductList from "./components/ProductList";
import RecommendedList from "./components/RecommendedList";
import BlogSection from "./components/BlogSection";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer } from "react-toastify";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      all_popular_items: [],
      all_recommended_items: [],
      blogs: [],
      order: [],
      order_subtotal: 0,
      wishlist: [],
    };
  }

  async componentDidMount() {
    let res = await axiosInstance.get(`/`);
    let data = await res.data;
    this.setState({
      all_popular_items: data.all_popular_items,
      all_recommended_items: data.all_recommended_items,
      blogs: data.blogs,
    });
    let res1 = await axiosInstance.get(`/order-cart/`);
    let data1 = await res1.data;
    this.setState({
      order: data1.order,
      order_subtotal: data1.subtotal,
    });
    let res2 = await axiosInstance.get(`/wishlist/`);
    let data2 = await res2.data;
    this.setState({
      wishlist: data2.wishlist,
    });
  }

  render() {
    return (
      <React.Fragment>
        <TopBarHeader />
        <Header />

        <div>
          {/* <!-- ======================= Top Category ======================== --> */}
          <TopCategory />

          {/* <!-- ======================= Recommended Items ======================== --> */}
          <RecommendedList recommend_items={this.state.all_recommended_items} />

          {/* <!-- ======================= Product List ======================== --> */}
          <ProductList popular_items={this.state.all_popular_items} />

          {/* <!-- ======================= Blog Section ============================ --> */}
          <BlogSection blogs={this.state.blogs} />
        </div>
        <ToastContainer />

        {/* <BottomFeatures /> */}
        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}
