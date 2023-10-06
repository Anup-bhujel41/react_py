import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default class OrderCompleted extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      wishlist: [],
      order_subtotal: 0,
    };
  }

  async componentDidMount() {
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
        <Header />

        <div>
          {/* <!-- ======================= Top Breadcrubms ======================== --> */}
          <div className="gray py-3">
            <div className="container">
              <div className="row">
                <div className="colxl-12 col-lg-12 col-md-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="#">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#">Support</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Complete Order
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= Product Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                  <div className="p-4 d-inline-flex align-items-center justify-content-center circle bg-light-success text-success mx-auto mb-4">
                    <i className="lni lni-heart-filled fs-lg"></i>
                  </div>
                  <h2 className="mb-2 ft-bold">Your Order is Completed!</h2>
                  <p className="ft-regular fs-md mb-5">
                    Your order has
                    been completed. Your order details are shown for your
                    personal accont.
                  </p>
                  <Link className="btn btn-dark" to="/my-orders">
                    Track Your Orders
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <BottomFeatures />
        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}
