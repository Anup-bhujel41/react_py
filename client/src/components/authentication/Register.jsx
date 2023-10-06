import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      c_password: "",
      order: [],
      wishlist: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let res1 = await axiosInstance.get(`/order-cart/`);
    let data1 = await res1.data;
    this.setState({
      order: data1.order,
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
      let res = await axiosInstance.post(`/register/`, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
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
        email: "",
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
                        <Link to="#">Pages</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Sign Up
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= Login Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mfliud">
                  <form
                    className="border p-3 rounded"
                    method="post"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label>First Name *</label>
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          placeholder="First Name"
                          required="required"
                          data-error="First name is required."
                          value={this.state.first_name}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          className="form-control"
                          placeholder="Last Name"
                          required="required"
                          data-error="Last name is required."
                          value={this.state.last_name}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required="required"
                        data-error="Email is required."
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div className="row">
                      <div className="form-group col-md-6">
                        <label>Password *</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          required="required"
                          data-error="Password is required."
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label>Confirm Password *</label>
                        <input
                          type="password"
                          name="c_password"
                          className="form-control"
                          placeholder="Confirm Password*"
                          required="required"
                          data-error="Confirm password is required."
                          value={this.state.c_password}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <p>
                        By registering your details, you agree with our Terms &
                        Conditions, and Privacy and Cookie Policy.
                      </p>
                    </div>

                    <div className="form-group">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="flex-1">
                          <input
                            id="newsletter"
                            className="checkbox-custom"
                            name="newsletter"
                            type="checkbox"
                          />
                          <label
                            htmlFor="newsletter"
                            className="checkbox-custom-label"
                          >
                            Sign me up for the Newsletter!
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-md full-width bg-dark text-light fs-md ft-medium"
                      >
                        Create An Account
                      </button>
                    </div>

                    <p style={{ textAlign: "right" }}>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ToastContainer />

        <BottomFeatures />
        <Footer />
        <Modal order={this.state.order} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}
