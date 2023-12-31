import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import SidebarDashboard from "./components/SidebarDashboard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { baseURL } from "../api/axiosInstance";

export default class AddPaymentCard extends Component {
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
                        Add Payment Method
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
                  <form className="row">
                    <div className="col-12 col-lg-12 col-xl-12 col-md-12 mb-3">
                      <h4 className="ft-medium fs-lg">
                        Add Debit / Credit Card
                      </h4>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="text-dark">Card Holder Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Dhananjay Preet"
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="text-dark">Card Number *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="5426 4586 5485 4759"
                        />
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-5 col-sm-6">
                      <div className="form-group">
                        <label className="text-dark">Expire Month *</label>
                        <select className="custom-select">
                          <option defaultValue="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-5 col-sm-6">
                      <div className="form-group">
                        <label className="text-dark">Expire Year *</label>
                        <select className="custom-select">
                          <option defaultValue="1">2010</option>
                          <option value="2">2018</option>
                          <option value="3">2019</option>
                          <option value="4">2020</option>
                          <option value="5">2021</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-12">
                      <div className="form-group">
                        <label className="text-dark">CVC *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CVV*"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <input
                          id="ak-2"
                          className="checkbox-custom"
                          name="ak-2"
                          type="checkbox"
                        />
                        <label htmlFor="ak-2" className="checkbox-custom-label">
                          By Continuing, you ar'e agree to conditions
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group text-center">
                        <Link to="#" className="btn btn-dark full-width">
                          Add & Save card
                        </Link>
                      </div>
                    </div>
                  </form>
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
