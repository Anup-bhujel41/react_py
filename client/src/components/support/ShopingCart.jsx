import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import { Link } from "react-router-dom";
import axiosInstance, { baseURL } from "../api/axiosInstance";

export default class ShopingCart extends Component {
  constructor() {
    super();
    this.state = {
      order: {},
      subtotal: 0,
      total: 0,
      wishlist: [],
      order_subtotal: 0,
    };
  }

  async componentDidMount() {
    let res1 = await axiosInstance.get(`/order-cart/`);
    let data1 = await res1.data;
    this.setState({
      order: data1.order,
      subtotal: data1.subtotal,
      total: data1.total,
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
                        Shopping Cart
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
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="text-center d-block mb-5">
                    <h2>Shopping Cart</h2>
                  </div>
                </div>
              </div>

              <div className="row justify-content-between">
                <div className="col-12 col-lg-7 col-md-12">
                  <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x mb-4">
                    {this.state.order.items?.map((item) => {
                      return (
                        <li className="list-group-item" key={item.item.slug}>
                          <div className="row align-items-center">
                            <div className="col-3">
                              <Link to={`/product/${item.item.slug}`}>
                                <img
                                  src={`${baseURL}${item.item.images[0].image}`}
                                  alt={item.item.name}
                                  className="img-fluid"
                                />
                              </Link>
                            </div>
                            <div className="col d-flex align-items-center justify-content-between">
                              <div className="cart_single_caption pl-2">
                                <h4 className="product_title fs-md ft-medium mb-1 lh-1">
                                  {item.item.name}
                                </h4>
                                <p className="mb-1 lh-1">
                                  <span className="text-dark">
                                    Size: {item.size.name}
                                  </span>
                                </p>
                                <p className="mb-1 lh-1">
                                  <span className="text-dark">
                                    Color: {item.color.name}
                                  </span>
                                </p>
                                <p className="mb-2 lh-1">
                                  <span className="text-dark">
                                    Price: Rs.{item.selling_price}
                                  </span>
                                </p>
                                <input
                                  type="number"
                                  name="quantity"
                                  className="w-auto mb-3 custom-select"
                                  required="required"
                                  value={item.quantity}
                                  disabled
                                  style={{ height: "40px" }}
                                />
                                <h4 className="fs-md ft-medium mb-3 lh-1">
                                  Total: Rs.{item.selling_price * item.quantity}
                                </h4>
                              </div>
                              <div className="fls_last">
                                <button className="close_slide gray">
                                  <i className="ti-close"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                    <div className="col-12 col-md-7">
                      <form className="mb-7 mb-md-0">
                        <label className="fs-sm ft-medium text-dark">
                          Coupon code:
                        </label>
                        <div className="row form-row">
                          <div className="col">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter coupon code*"
                            />
                          </div>
                          <div className="col-auto">
                            <button className="btn btn-dark" type="submit">
                              Apply
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-12 col-md-auto mfliud">
                      <button className="btn stretched-link borders">
                        Update Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-12 col-lg-4">
                  <div className="card mb-4 gray mfliud">
                    <div className="card-body">
                      <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                        <li className="list-group-item d-flex text-dark fs-sm ft-regular">
                          <span>Subtotal</span>{" "}
                          <span className="ml-auto text-dark ft-medium">
                            Rs.{this.state.subtotal}
                          </span>
                        </li>
                        <li className="list-group-item d-flex text-dark fs-sm ft-regular">
                          <span>Discount</span>{" "}
                          <span className="ml-auto text-dark ft-medium">
                            Rs.
                            {this.state.order.coupon != null
                              ? this.state.order.coupon.amount
                              : 0}
                          </span>
                        </li>
                        <li className="list-group-item d-flex text-dark fs-sm ft-regular">
                          <span>Total</span>{" "}
                          <span className="ml-auto text-dark ft-medium">
                            Rs.{this.state.total}
                          </span>
                        </li>
                        <li className="list-group-item fs-sm text-center">
                          Shipping cost calculated at Checkout *
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link className="btn btn-block btn-dark mb-3" to="/checkout">
                    Proceed to Checkout
                  </Link>

                  <Link className="btn-link text-dark ft-medium" to="/">
                    <i className="ti-back-left mr-2"></i> Continue Shopping
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
