import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Footer extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      let res = await axiosInstance.post(`/subscribe/`, {
        email: this.state.email,
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
        email: "",
      });
    } catch (err) {
      if (err.response.data.message !== undefined){
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
        <footer className="dark-footer skin-dark-footer style-2">
          <div className="footer-middle">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                  <div className="footer_widget">
                    <img
                      src="/assets/logo1-white.png"
                      className="img-footer small mb-2"
                      alt=""
                    />

                    <div className="address mt-3">
                      44200 Bharatpur-10, Chitwan
                      <br />
                      Nepal (NP)
                    </div>
                    <div className="address mt-3">
                      056-582002
                      <br />
                      info@thefashionfit.com
                    </div>
                    <div className="address mt-3">
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <Link to="#">
                            <i className="lni lni-facebook-filled"></i>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i className="lni lni-twitter-filled"></i>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i className="lni lni-youtube"></i>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i className="lni lni-instagram"></i>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i className="lni lni-linkedin-original"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                  <div className="footer_widget">
                    <h4 className="widget_title">Supports</h4>
                    <ul className="footer-menu">
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ's Page</Link>
                      </li>
                      <li>
                        <Link to="/privacy">Privacy</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                  <div className="footer_widget">
                    <h4 className="widget_title">Shop</h4>
                    <ul className="footer-menu">
                      <li>
                        <Link to="/shop/mens">Men's Shopping</Link>
                      </li>
                      <li>
                        <Link to="/shop/kids">Kids's Shopping</Link>
                      </li>
                      <li>
                        <Link to="/shop/womens">Women's Shopping</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                  <div className="footer_widget">
                    <h4 className="widget_title">Subscribe</h4>
                    <p>
                      Receive updates, hot deals, discounts sent straignt in
                      your inbox daily
                    </p>
                    <div className="foot-news-last">
                      <form method="post" onSubmit={this.handleSubmit}>
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                          />
                          <div className="input-group-append">
                            <button
                              type="submit"
                              className="input-group-text b-0 text-light"
                            >
                              <i className="lni lni-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <div className="address mt-3">
                      <h5 className="fs-sm text-light">Secure Payments</h5>
                      <div className="scr_payment">
                        <img
                          src="/assets/img/card.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />

          <div className="footer-bottom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 text-center">
                  <p className="mb-0">
                    © 2022. Designed & Developed By <Link to="/" style={{"color": "#e1e1e1"}}>TheFashionFit</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
