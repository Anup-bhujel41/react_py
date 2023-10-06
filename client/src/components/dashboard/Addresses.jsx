import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import SidebarDashboard from "./components/SidebarDashboard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Addresses extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      wishlist: [],
      addresses: [],
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
    let res3 = await axiosInstance.get(`/addresses/`);
    let data3 = await res3.data;
    this.setState({
      addresses: data3.addresses,
    });
  }

  async handleDeleteSubmit(address_id) {
    try {
      let res = await axiosInstance.delete(`/address/${address_id}`);
      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      if (err.response.data.message !== undefined) {
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      } else {
        toast.error(err.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          theme: "colored",
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    }
    let res3 = await axiosInstance.get(`/addresses/`);
    let data3 = await res3.data;
    this.setState({
      addresses: data3.addresses,
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
                        Addresses
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
                    
                    {this.state.addresses?.map((address) => {
                      return (
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div className="card-wrap border rounded mb-4">
                            <div className="card-wrap-header px-3 py-2 br-bottom d-flex align-items-center justify-content-between">
                              <div className="card-header-flex">
                                <h4 className="fs-md ft-bold mb-1">
                                  Shipping Address
                                </h4>
                                {address.default ? (<p className="m-0 p-0">
                                  <span className="text-success bg-light-success small ft-medium px-2 py-1">
                                    Primary Account
                                  </span>
                                </p>) : (<></>)}
                              </div>
                              <div className="card-head-last-flex">
                                <Link
                                  className="border p-3 circle text-dark d-inline-flex align-items-center justify-content-center"
                                  to={`/addresses/edit-address/${address.id}`}
                                >
                                  <i className="fas fa-pen-nib position-absolute"></i>
                                </Link>
                                <button onClick={() => this.handleDeleteSubmit(address.id)} className="border bg-white text-danger p-3 circle text-dark d-inline-flex align-items-center justify-content-center ml-1" style={{cursor: "pointer"}}>
                                  <i className="fas fa-times position-absolute"></i>
                                </button>
                              </div>
                            </div>
                            <div className="card-wrap-body px-3 py-3">
                              <h5 className="ft-medium mb-1">{address.full_name}</h5>
                              <p>
                                {address.street_address}
                                <br />
                                {address.apartment_address}
                              </p>
                              <p className="lh-1">
                                <span className="text-dark ft-medium">Email:</span>{" "}
                                {address.user.email}
                              </p>
                              <p>
                                <span className="text-dark ft-medium">Call:</span>{" "}
                                {address.phone_number}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  <div className="row align-items-start">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <Link
                          to="/addresses/add-address"
                          className="btn stretched-link borders full-width"
                        >
                          <i className="fas fa-plus mr-2"></i>Add New Address
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
