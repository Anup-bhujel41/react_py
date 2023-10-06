import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import SidebarDashboard from "./components/SidebarDashboard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { baseURL } from "../api/axiosInstance";
import dateFormat from "dateformat";

export default class MyOrders extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      wishlist: [],
      orders: [],
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
    let res3 = await axiosInstance.get(`/orders/`);
    let data3 = await res3.data;
    this.setState({
      orders: data3.orders,
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
                        My Order
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

                <div className="col-12 col-md-12 col-lg-8 col-xl-8 text-center">

                  {this.state.orders?.map((order) => {
                    return (
                      <div className="ord_list_wrap border mb-4" key={order.ref_code}>
                        <div className="ord_list_head gray d-flex align-items-center justify-content-between px-3 py-3">
                          <div className="olh_flex">
                            <p className="m-0 p-0">
                              <span className="text-muted">Order Number</span>
                            </p>
                            <h6 className="mb-0 ft-medium">
                              #{order.ref_code}
                            </h6>
                          </div>
                        </div>
                        <div className="ord_list_body text-left">

                          {order.items?.map((item) => {
                            return (
                              <div className="row align-items-center justify-content-center m-0 py-4 br-bottom" key={item.item.slug}>
                                <div className="col-xl-5 col-lg-5 col-md-5 col-12">
                                  <div className="cart_single d-flex align-items-start mfliud-bot">
                                    <div className="cart_selected_single_thumb">
                                      <Link to={`/product/${item.item.slug}`}>
                                        <img
                                          src={`${baseURL}${item.item.images[0].image}`}
                                          width="75"
                                          className="img-fluid rounded"
                                          alt={item.item.name}
                                        />
                                      </Link>
                                    </div>
                                    <div className="cart_single_caption pl-3">
                                      <p className="mb-0">
                                        <span className="text-muted small">
                                          {item.item.category.name}
                                        </span>
                                      </p>
                                      <h4 className="product_title fs-sm ft-medium mb-1 lh-1">
                                        {item.item.name}
                                      </h4>
                                      <p className="mb-2">
                                        <span className="text-dark medium">
                                          Size: {item.size.name}
                                        </span>
                                        ,{" "}
                                        <span className="text-dark medium">
                                          Color: {item.color.name}
                                        </span>
                                      </p>
                                      <h4 className="fs-sm ft-bold mb-0 lh-1">
                                        Rs.{item.selling_price}
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                  <p className="mb-1 p-0">
                                    <span className="text-muted">Status</span>
                                  </p>
                                  <div className="delv_status">
                                    {order.status === 0 ? (
                                      <span className="ft-medium small rounded px-3 py-1 text-warning bg-light-warning">
                                        Pending
                                      </span>
                                    ) : order.status === 1 ? (
                                      <span className="ft-medium small rounded px-3 py-1 text-warning bg-light-warning">
                                        Processing
                                      </span>
                                    ) : order.status === 2 ? (
                                      <span className="ft-medium small rounded px-3 py-1 text-success bg-light-success">
                                        Being Delivered
                                      </span>
                                    ) : order.status === 3 ? (
                                      <span className="ft-medium small rounded px-3 py-1 text-success bg-light-success">
                                        Received
                                      </span>
                                    ) : (
                                      <span className="ft-medium small rounded px-3 py-1 text-danger bg-light-danger">
                                        Canceled
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                  <p className="mb-1 p-0">
                                    <span className="text-muted">
                                      Expected date by:
                                    </span>
                                  </p>
                                  <h6 className="mb-0 ft-medium fs-sm">
                                    {dateFormat(
                                      order.ordered_date,
                                      "mmmm dS, yyyy"
                                    )}
                                  </h6>
                                </div>
                              </div>
                            );
                          })}

                        </div>

                        <div className="ord_list_footer d-flex align-items-center justify-content-between br-top px-3">
                          {order.status === 0 ? <div className="col-xl-3 col-lg-3 col-md-4 olf_flex text-left px-0 py-2 br-right">
                            <Link to="#" className="ft-medium fs-sm">
                              <i className="ti-close mr-2"></i>Cancel Order
                            </Link>
                          </div> : <></>}
                          <div className="col-xl-9 col-lg-9 col-md-8 pr-0 py-2 olf_flex d-flex align-items-center justify-content-between">
                            {/* <div className="olf_flex_inner hide_mob">
                              <p className="m-0 p-0">
                                <span className="text-muted medium">
                                  Paid using debit card ending with 6472
                                </span>
                              </p>
                            </div> */}
                            <div className="olf_inner_right">
                              <h5 className="mb-0 fs-sm ft-bold">
                                Total: Rs.{order.total_price}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

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
