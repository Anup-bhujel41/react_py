import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import SidebarDashboard from "./components/SidebarDashboard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class ProfileInfo extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      gender: "M",
      about_me: "",
      password: "",
      c_password: "",
      order: [],
      wishlist: [],
      order_subtotal: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let res = await axiosInstance.post(`/update-profile/`, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        gender: this.state.gender,
        about_me: this.state.about_me,
        password: this.state.password,
      });
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
      this.setState({
        first_name: "",
        last_name: "",
        gender: "M",
        about_me: "",
        password: "",
        c_password: "",
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
                        Profile Info
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
                  <div className="row align-items-center">
                    <form className="row m-0" method="post" onSubmit={this.handleSubmit}>
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="small text-dark ft-medium">
                            First Name *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            name="first_name"
                            required="required"
                            data-error="First name is required."
                            value={this.state.first_name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="small text-dark ft-medium">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            name="last_name"
                            required="required"
                            data-error="Last name is required."
                            value={this.state.last_name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="small text-dark ft-medium">
                            Gender *
                          </label>
                          <select className="form-control custom-select" name="gender" defaultValue={this.state.gender} onChange={this.handleInputChange}>
														<option value="M">Male</option>
														<option value="F">Female</option>
													</select>
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="small text-dark ft-medium">
                            About Us *
                          </label>
                          <textarea className="form-control ht-80" name="about_me"
                          required="required"
                          data-error="About me is required."
                          onChange={this.handleInputChange}>{this.state.about_me}</textarea>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="small text-dark ft-medium">
                            New Password *
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            name="password"
                            required="required"
                            data-error="Password is required."
                            value={this.state.password}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label className="small text-dark ft-medium">
                            Confirm Password *
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            name="c_password"
                            required="required"
                            data-error="Confirm password is required."
                            value={this.state.c_password}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <button type="submit" className="btn btn-dark">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ToastContainer />

        <BottomFeatures />
        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}
