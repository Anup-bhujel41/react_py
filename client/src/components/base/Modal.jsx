import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../api/axiosInstance";

function closeWishlist() {
  document.getElementById("Wishlist").style.display = "none";
}
function closeCart() {
  document.getElementById("Cart").style.display = "none";
}
function closeSearch() {
  document.getElementById("Search").style.display = "none";
}

export default class Modal extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      search_query: "",
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
    let { order, order_subtotal, wishlist } = this.props;
    return (
      <React.Fragment>
        {/* <!-- Log In Modal --> */}
        <div
          className="modal fade"
          id="login"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="loginmodal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl login-pop-form" role="document">
            <div className="modal-content" id="loginmodal">
              <div className="modal-headers">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="ti-close"></span>
                </button>
              </div>

              <div className="modal-body p-5">
                <div className="text-center mb-4">
                  <h2 className="m-0 ft-regular">Login</h2>
                </div>

                <form method="post" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Id"
                      name="email"
                      required="required"
                      data-error="Email is required."
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
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
                          id="dd"
                          className="checkbox-custom"
                          name="dd"
                          type="checkbox"
                        />
                        <label htmlFor="dd" className="checkbox-custom-label">
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

                  <div className="form-group text-center mb-0">
                    <p className="extra">
                      Not a member?
                      <Link
                        onClick={() => {window.location.href="/register"}}
                        // data-dismiss="modal"
                        // aria-label="Close"
                        className="text-dark"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Search --> */}
        <div
          className="w3-ch-sideBar w3-bar-block w3-card-2 w3-animate-right"
          style={{ display: "none", right: "0" }}
          id="Search"
        >
          <div className="rightMenu-scroll">
            <div className="d-flex align-items-center justify-content-between slide-head py-3 px-3">
              <h4 className="cart_heading fs-md ft-medium mb-0">
                Search Products
              </h4>
              <button onClick={closeSearch} className="close_slide">
                <i className="ti-close"></i>
              </button>
            </div>

            <div className="cart_action px-3 py-4">
              {/* <form className="form m-0 p-0"> */}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Keyword.."
                    name="search_query"
                    required="required"
                    data-error="Query is required."
                    value={this.state.search_query}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* <div className="form-group">
                  <select className="custom-select">
                    <option defaultValue="1">Choose Category</option>
                    <option value="2">Men's Store</option>
                    <option value="3">Kid's Fashion</option>
                    <option value="4">Women's Store</option>
                  </select>
                </div> */}

                <div className="form-group mb-0">
                  <Link
                    to={`/search/${this.state.search_query}`}
                    className="btn d-block full-width btn-dark"
                  >
                    Search Product
                  </Link>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>

        {/* <!-- Wishlist --> */}
        <div
          className="w3-ch-sideBar w3-bar-block w3-card-2 w3-animate-right"
          style={{ display: "none", right: "0" }}
          id="Wishlist"
        >
          <div className="rightMenu-scroll">
            <div className="d-flex align-items-center justify-content-between slide-head py-3 px-3">
              <h4 className="cart_heading fs-md ft-medium mb-0">
                Saved Products
              </h4>
              <button onClick={closeWishlist} className="close_slide">
                <i className="ti-close"></i>
              </button>
            </div>
            <div className="right-ch-sideBar">
              <div className="cart_select_items py-2">
                {wishlist?.map((item) => {
                  return (
                    <div
                      className="d-flex align-items-center justify-content-between br-bottom px-3 py-3"
                      key={item.item.slug}
                    >
                      <div className="cart_single d-flex align-items-center">
                        <div className="cart_selected_single_thumb">
                          <Link to="#">
                            <img
                              src={`${baseURL}${item.item.images[0].image}`}
                              width="60"
                              className="img-fluid"
                              alt={item.item.name}
                            />
                          </Link>
                        </div>
                        <div className="cart_single_caption pl-2">
                          <h4 className="product_title fs-sm ft-medium mb-0 lh-1">
                            {item.item.name}
                          </h4>
                          {/* <p className="mb-2">
                            <span className="text-dark ft-medium small">
                              36
                            </span>
                            , <span className="text-dark small">Red</span>
                          </p> */}
                          <h4 className="fs-md ft-medium mb-0 lh-1">
                            Rs.{item.item.price}
                          </h4>
                        </div>
                      </div>
                      <div className="fls_last">
                        <button className="close_slide gray">
                          <i className="ti-close"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <div className="d-flex align-items-center justify-content-between br-top br-bottom px-3 py-3">
                <h6 className="mb-0">Subtotal</h6>
                <h3 className="mb-0 ft-medium">Rs.417</h3>
              </div> */}

              <div className="cart_action px-3 py-3">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn d-block full-width btn-dark"
                  >
                    Move To Cart
                  </button>
                </div>
                <div className="form-group">
                  <Link
                    to="/wishlist"
                    className="btn d-block full-width btn-dark-light"
                  >
                    Edit or View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Cart --> */}
        <div
          className="w3-ch-sideBar w3-bar-block w3-card-2 w3-animate-right"
          style={{ display: "none", right: "0" }}
          id="Cart"
        >
          <div className="rightMenu-scroll">
            <div className="d-flex align-items-center justify-content-between slide-head py-3 px-3">
              <h4 className="cart_heading fs-md ft-medium mb-0">
                Products List
              </h4>
              <button onClick={closeCart} className="close_slide">
                <i className="ti-close"></i>
              </button>
            </div>
            <div className="right-ch-sideBar">
              <div className="cart_select_items py-2">
                {order.items?.map((item) => {
                  return (
                    <div
                      className="d-flex align-items-center justify-content-between br-bottom px-3 py-3"
                      key={item.item.slug}
                    >
                      <div className="cart_single d-flex align-items-center">
                        <div className="cart_selected_single_thumb">
                          <Link to="#">
                            <img
                              src={`${baseURL}${item.item.images[0].image}`}
                              width="60"
                              className="img-fluid"
                              alt={item.item.name}
                            />
                          </Link>
                        </div>
                        <div className="cart_single_caption pl-2">
                          <h4 className="product_title fs-sm ft-medium mb-0 lh-1">
                            {item.item.name}
                          </h4>
                          <p className="mb-2">
                            <span className="text-dark ft-medium small">
                              {item.size.name}
                            </span>
                            ,{" "}
                            <span className="text-dark small">
                              {item.color.name}
                            </span>
                          </p>
                          <h4 className="fs-md ft-medium mb-0 lh-1">
                            Rs.{item.selling_price}
                          </h4>
                        </div>
                      </div>
                      <div className="fls_last">
                        <button className="close_slide gray">
                          <i className="ti-close"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="d-flex align-items-center justify-content-between br-top br-bottom px-3 py-3">
                <h6 className="mb-0">Subtotal</h6>
                <h3 className="mb-0 ft-medium">Rs.{order_subtotal}</h3>
              </div>

              <div className="cart_action px-3 py-3">
                <div className="form-group">
                  <Link
                    to="/checkout"
                    className="btn d-block full-width btn-dark"
                  >
                    Checkout Now
                  </Link>
                </div>
                <div className="form-group">
                  <Link
                    to="/shoping-cart"
                    className="btn d-block full-width btn-dark-light"
                  >
                    Edit or View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link id="back2Top" className="top-scroll" title="Back to top" to="#">
          <i className="ti-arrow-up"></i>
        </Link>
      </React.Fragment>
    );
  }
}
