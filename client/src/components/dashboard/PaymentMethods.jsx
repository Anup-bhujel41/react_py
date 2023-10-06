import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import SidebarDashboard from "./components/SidebarDashboard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { baseURL } from "../api/axiosInstance";

export default class PaymentMethods extends Component {
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
                        <Link to="#">Dashboard</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Payment Methode
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= Dashboard Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row align-items-start justify-content-between">
                <SidebarDashboard />

                <div className="col-12 col-md-12 col-lg-8 col-xl-8">
                  <div className="row align-items-start">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="card-wrap gray rounded mb-4">
                        <div className="card-wrap-header px-3 py-2 br-bottom d-flex align-items-center justify-content-between">
                          <div className="card-header-flex">
                            <h4 className="fs-md ft-bold mb-1">
                              Debit / Credit Card
                            </h4>
                          </div>
                          <div className="card-head-last-flex">
                            <Link
                              className="border p-3 bg-white circle text-dark d-inline-flex align-items-center justify-content-center"
                              to="add-card.html"
                            >
                              <i className="fas fa-pen-nib position-absolute"></i>
                            </Link>
                            <button className="border bg-white text-danger p-3 circle text-dark d-inline-flex align-items-center justify-content-center">
                              <i className="fas fa-times position-absolute"></i>
                            </button>
                          </div>
                        </div>
                        <div className="card-wrap-body px-3 py-3">
                          <div className="pay-card mb-3">
                            <h5 className="fs-sm ft-bold mb-0">Card Number</h5>
                            <p>1470 **** **** 6325 (Visa)</p>
                          </div>
                          <div className="pay-card mb-3">
                            <h5 className="fs-sm ft-bold mb-0">Card Holder</h5>
                            <p>Dhananjay Preet</p>
                          </div>

                          <div className="pay-card mb-3">
                            <h5 className="fs-sm ft-bold mb-0">Expired</h5>
                            <p>January 2027</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="card-wrap gray rounded mb-4">
                        <div className="card-wrap-header px-3 py-2 br-bottom d-flex align-items-center justify-content-between">
                          <div className="card-header-flex">
                            <h4 className="fs-md ft-bold mb-1">
                              Debit / Credit Card
                            </h4>
                          </div>
                          <div className="card-head-last-flex">
                            <Link
                              className="border p-3 bg-white circle text-dark d-inline-flex align-items-center justify-content-center"
                              to="add-card.html"
                            >
                              <i className="fas fa-pen-nib position-absolute"></i>
                            </Link>
                            <button className="border bg-white text-danger p-3 circle text-dark d-inline-flex align-items-center justify-content-center">
                              <i className="fas fa-times position-absolute"></i>
                            </button>
                          </div>
                        </div>
                        <div className="card-wrap-body px-3 py-3">
                          <div className="pay-card mb-3">
                            <h5 className="fs-sm ft-bold mb-0">Card Number</h5>
                            <p>8526 **** **** 1700 (Visa)</p>
                          </div>
                          <div className="pay-card mb-3">
                            <h5 className="fs-sm ft-bold mb-0">Card Holder</h5>
                            <p>Dhananjay Singh</p>
                          </div>

                          <div className="pay-card mb-3">
                            <h5 className="fs-sm ft-bold mb-0">Expired</h5>
                            <p>January 2027</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row align-items-start">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <Link
                          to="/payment-methods/add-card"
                          className="btn stretched-link borders full-width"
                        >
                          <i className="fas fa-plus mr-2"></i>Add New Card
                        </Link>
                      </div>
                    </div>
                  </div>
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
