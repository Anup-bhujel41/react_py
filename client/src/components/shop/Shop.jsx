import React, { Component } from "react";
import Header from '../base/Header';
import Footer from '../base/Footer';
import Modal from '../base/Modal';
import BottomFeatures from "../base/BottomFeatures";
import FilterProduct from "./components/FilterProduct";
import ProductList from "./components/ProductList";
import TopStyle from "./components/TopStyle";
import axiosInstance from "../api/axiosInstance";
import TopBarHeader from "../base/TopBarHeader";

export default class Shop extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      order: [],
      wishlist: [],
      order_subtotal: 0,
    };
  }

  async componentDidMount() {
    let res = await axiosInstance.get(`/shop/`);
    let data = await res.data;
    this.setState({
      items: data.items,
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
          {/* <!-- ======================= Top Style ======================== --> */}
          <TopStyle />

          {/* <!-- ======================= Filter Product ======================== --> */}
          <FilterProduct />

          {/* <!-- ======================= Product List ======================== --> */}
          <ProductList items={this.state.items} />

        </div>

        <BottomFeatures />
        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}
