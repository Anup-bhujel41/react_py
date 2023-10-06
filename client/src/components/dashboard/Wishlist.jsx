import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import SidebarDashboard from "./components/SidebarDashboard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { baseURL } from "../api/axiosInstance";

export default class Wishlist extends Component {
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
                        Wishlist
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
              <div className="row justify-content-center justify-content-between">
                <SidebarDashboard />

                <div className="col-12 col-md-12 col-lg-8 col-xl-8 text-center">
                  <div className="row align-items-center">

                    {this.state.wishlist?.map((item) => {
                      return (
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={item.item.slug}>
                          <div className="product_grid card b-0">
                            <div className="badge bg-success text-white position-absolute ft-regular ab-left text-upper">
                              Sale
                            </div>
                            <button className="btn btn_love position-absolute ab-right theme-cl">
                              <i className="fas fa-times"></i>
                            </button>
                            <div className="card-body p-0">
                              <div className="shop_thumb position-relative">
                                <Link
                                  className="card-img-top d-block overflow-hidden"
                                  to={`/product/${item.item.slug}`}
                                >
                                  <img
                                    className="card-img-top"
                                    src={`${baseURL}${item.item.images[0].image}`}
                                    alt={item.item.name}
                                  />
                                </Link>
                                <div className="product-hover-overlay bg-dark d-flex align-items-center justify-content-center">
                                  <div className="edlio">
                                    <Link
                                      to="#"
                                      data-toggle="modal"
                                      data-target="#quickview"
                                      className="text-white fs-sm ft-medium"
                                    >
                                      <i className="fas fa-eye mr-1"></i>Quick
                                      View
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-footers b-0 pt-3 px-2 bg-white d-flex align-items-start justify-content-center">
                              <div className="text-left">
                                <div className="text-center">
                                  <h5 className="fw-bolder fs-md mb-0 lh-1 mb-1">
                                    <Link to={`/product/${item.item.slug}`}>
                                      {item.item.name}
                                    </Link>
                                  </h5>
                                  <div className="elis_rty">
                                    <span className="ft-bold fs-md text-dark">
                                      Rs.{item.item.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

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
