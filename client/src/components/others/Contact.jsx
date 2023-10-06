import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBarHeader from "../base/TopBarHeader";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
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
      let res = await axiosInstance.post(`/contact-form/`, {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
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
        name: "",
        email: "",
        subject: "",
        message: "",
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
        <TopBarHeader />
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
                        Contact Us
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= Contact Page Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="sec_title position-relative text-center">
                    <h2 className="off_title">Contact Us</h2>
                    <h3 className="ft-bold pt-3">Get In Touch</h3>
                  </div>
                </div>
              </div>

              <div className="row align-items-start justify-content-between">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                  <div className="card-wrap-body mb-4">
                    <h4 className="ft-medium mb-3 theme-cl">Make a Call</h4>
                    <p>
                      44200 Bharatpur-10, Chitwan,
                      <br /> Nepal (NP)
                    </p>
                    <p className="lh-1">
                      <span className="text-dark ft-medium">Email:</span>{" "}
                      contact@thefashionfit.com
                    </p>
                  </div>

                  <div className="card-wrap-body mb-3">
                    <h4 className="ft-medium mb-3 theme-cl">Make a Call</h4>
                    <h6 className="ft-medium mb-1">Customer Care:</h6>
                    <p className="mb-2">+977 056-582002</p>
                    <h6 className="ft-medium mb-1">Careers::</h6>
                    <p>+977 056-582003</p>
                  </div>

                  <div className="card-wrap-body mb-3">
                    <h4 className="ft-medium mb-3 theme-cl">Drop A Mail</h4>
                    <p>
                      Fill out our form and we will contact you within 24 hours.
                    </p>
                    <p className="lh-1 text-dark">info@thefashionfit.com</p>
                    <p className="lh-1 text-dark">sales@thefashionfit.com</p>
                  </div>
                </div>

                <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                  <form
                    className="row"
                    method="post"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="small text-dark ft-medium">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          name="name"
                          required="required"
                          data-error="Name is required."
                          value={this.state.name}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="small text-dark ft-medium">
                          Your Email *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Email"
                          name="email"
                          required="required"
                          data-error="Email is required."
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="small text-dark ft-medium">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type Your Subject"
                          name="subject"
                          required="required"
                          data-error="Subject is required."
                          value={this.state.subject}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <label className="small text-dark ft-medium">
                          Message
                        </label>
                        <textarea
                          className="form-control ht-80"
                          name="message"
                          required="required"
                          data-error="Message is required."
                          onChange={this.handleInputChange}
                        >
                          {this.state.message}
                        </textarea>
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="form-group">
                        <button type="submit" className="btn btn-dark">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ToastContainer />

        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}
