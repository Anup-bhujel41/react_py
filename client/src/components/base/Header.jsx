import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function openWishlist() {
  document.getElementById("Wishlist").style.display = "block";
}
function openCart() {
  document.getElementById("Cart").style.display = "block";
}
function openSearch() {
  document.getElementById("Search").style.display = "block";
}

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      order: [],
      wishlist: [],
      submenuCat: false,
      submenuOther: false,
      userAuthenticated: false,
    };
    this.handleCatHover = this.handleCatHover.bind(this);
    this.handleOtherHover = this.handleOtherHover.bind(this);
  }

  async componentDidMount() {
    let res = await axiosInstance.get(`/categories/`);
    let data = await res.data;
    this.setState({
      categories: data.categories,
    });
    let res1 = await axiosInstance.get(`/order-cart/`);
    if (res1.status !== 401) {
      this.setState({
        userAuthenticated: true,
      });
    }
    let data1 = await res1.data;
    if (Object.keys(data1.order).length !== 0) {
      this.setState({
        order: data1.order.items,
      });
    }
    let res2 = await axiosInstance.get(`/wishlist/`);
    let data2 = await res2.data;
    this.setState({
      wishlist: data2.wishlist,
    });
  }

  handleCatHover() {
    this.setState({
      submenuCat: !this.state.submenuCat,
    });
  }

  handleOtherHover() {
    this.setState({
      submenuOther: !this.state.submenuOther,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="header header-light dark-text">
          <div className="container">
            <nav id="navigation" className="navigation navigation-landscape">
              <div className="nav-header">
                <Link className="nav-brand" to="/">
                  <img
                    src="/assets/logo1.png"
                    className="logo"
                    alt="TheFashionFit"
                    style={{ height: "48px", width: "100px" }}
                  />
                </Link>
                <div className="nav-toggle"></div>
                <div className="mobile_nav">
                  <ul>
                    <li>
                      <Link to="#" onClick={openSearch}>
                        <i className="lni lni-search-alt"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" data-toggle="modal" data-target="#login">
                        <i className="lni lni-user"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={openWishlist}>
                        <i className="lni lni-heart"></i>
                        <span className="dn-counter">
                          {this.state.wishlist.length}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={openCart}>
                        <i className="lni lni-shopping-basket"></i>
                        <span className="dn-counter">
                          {this.state.order.length}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="nav-menus-wrapper"
                style={{ transitionProperty: "none" }}
              >
                <ul className="nav-menu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>

                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>

                  <li
                    onMouseEnter={this.handleCatHover}
                    onMouseLeave={this.handleCatHover}
                  >
                    <Link to="#">Categories</Link>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{
                        right: "auto",
                        display: this.state.submenuCat ? "block" : "none",
                      }}
                    >
                      {this.state.categories.map((category) => {
                        return (
                          <li key={category.slug}>
                            <Link to={`/category/${category.slug}`}>
                              {category.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>

                  <li>
                    <Link to="/blogs">Blog</Link>
                  </li>

                  <li
                    onMouseEnter={this.handleOtherHover}
                    onMouseLeave={this.handleOtherHover}
                  >
                    <Link to="#">Others</Link>
                    <ul
                      className="nav-dropdown nav-submenu"
                      style={{
                        right: "auto",
                        display: this.state.submenuOther ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/privacy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQs</Link>
                      </li>
                    </ul>
                  </li>
                </ul>

                <ul className="nav-menu nav-menu-social align-to-right">
                  <li>
                    <Link to="#" onClick={openSearch}>
                      <i className="lni lni-search-alt"></i>
                    </Link>
                  </li>
                  <li>
                    {this.state.userAuthenticated ? (
                      <Link to="/my-orders">
                        <i className="lni lni-user"></i>
                      </Link>
                    ) : (
                      <Link to="#" data-toggle="modal" data-target="#login">
                        <i className="lni lni-user"></i>
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link to="#" onClick={openWishlist}>
                      <i className="lni lni-heart"></i>
                      <span className="dn-counter">
                        {this.state.wishlist.length}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={openCart}>
                      <i className="lni lni-shopping-basket"></i>
                      <span className="dn-counter theme-bg">
                        {this.state.order.length}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="clearfix"></div>
      </React.Fragment>
    );
  }
}
