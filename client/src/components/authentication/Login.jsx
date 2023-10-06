import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      let res = await axiosInstance.post(`/login/`, {
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
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      this.setState({
        email: "",
        password: "",
      });
      window.location = "/";
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
                        Login
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
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <form
                    className="border p-3 rounded"
                    method="post"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email Id"
                        required="required"
                        data-error="Email is required."
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div className="form-group">
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

                    <div className="form-group">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="flex-1">
                          <input
                            id="remember"
                            className="checkbox-custom"
                            name="remember"
                            type="checkbox"
                          />
                          <label
                            htmlFor="remember"
                            className="checkbox-custom-label"
                          >
                            Remember Me
                          </label>
                        </div>
                        <div className="eltio_k2">
                          <Link to="#">Lost Your Password?</Link>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-md full-width bg-dark text-light fs-md ft-medium"
                      >
                        Login
                      </button>
                    </div>

                    <p style={{ textAlign: "right" }}>
                      New User? <Link to="/register">Register Now</Link>
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
