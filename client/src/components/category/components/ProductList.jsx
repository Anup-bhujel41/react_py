import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../api/axiosInstance";

export default class ProductList extends Component {
  render() {
    let { items } = this.props;
    return (
      <React.Fragment>
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="border mb-3 mfliud">
                <div className="row align-items-center py-2 m-0">
                  <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12">
                    <h6 className="mb-0">{items.length} Items Found</h6>
                  </div>

                  <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12">
                    <div className="filter_wraps d-flex align-items-center justify-content-end m-start">
                      <div className="single_fitres mr-2 br-right">
                        <select className="custom-select simple">
                          <option defaultValue="1">Default Sorting</option>
                          <option value="2">Sort by price: Low price</option>
                          <option value="3">Sort by price: Hight price</option>
                          <option value="4">Sort by rating</option>
                          <option value="5">Sort by trending</option>
                        </select>
                      </div>
                      <div className="single_fitres">
                        <Link
                          to="shop-style-5.html"
                          className="simple-button active mr-1"
                        >
                          <i className="ti-layout-grid2"></i>
                        </Link>
                        <Link
                          to="shop-list-sidebar.html"
                          className="simple-button"
                        >
                          <i className="ti-view-list"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center rows-products">
            {items?.map((item) => {
              return (
                <div className="col-xl-4 col-lg-4 col-md-6 col-6" key={item.slug}>
                  <div className="product_grid card b-0 max-h-card-360">
                    <div className="badge bg-info text-white position-absolute ft-regular ab-left text-upper">
                      New
                    </div>
                    <div className="p-0">
                      <div className="shop_thumb position-relative">
                        <Link
                          className="card-img-top d-block overflow-hidden"
                          to={`/product/${item.slug}`}
                        >
                          <img
                            className="card-img-top img-h-250"
                            src={`${baseURL}${item.images[0].image}`}
                            alt={item.name}
                          />
                        </Link>
                        <div className="product-hover-overlay bg-dark d-flex align-items-center justify-content-center">
                          <div className="edlio">
                            <Link
                              to={`/product/${item.slug}`}
                              data-toggle="modal"
                              data-target="#quickview"
                              className="text-white fs-sm ft-medium"
                            >
                              <i className="fas fa-eye mr-1"></i>Quick View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer b-0 p-0 pt-2 bg-white">
                      <div className="d-flex align-items-start justify-content-between">
                        <div className="text-left">

                          {item.color?.map((color) => {
                            return (
                              <div className="form-check form-option form-check-inline mb-1" key={color.color_code}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="color"
                                  id={color?.color_code}
                                />
                                <label
                                  className="form-option-label rounded-circle"
                                  htmlFor={color?.color_code}
                                >
                                  <span
                                    className="form-option-color rounded-circle"
                                    style={{
                                      background: "#" + color?.color_code,
                                    }}
                                  ></span>
                                </label>
                              </div>
                            );
                          })}

                        </div>
                        <div className="text-right">
                          <button className="btn auto btn_love snackbar-wishlist">
                            <i className="far fa-heart"></i>
                          </button>
                        </div>
                      </div>
                      <div className="text-left">
                        <h5 className="fw-bolder fs-md mb-0 lh-1 mb-1 max-h-name">
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </h5>
                        <div className="elis_rty">
                          <span className="ft-bold text-dark fs-sm">
                            <span className="text-decoration-line-through">{item.discount_price !== 0 ? `Rs.${item.price}` : ""}</span> {item.discount_price !== 0 ? ` - Rs.${item.discount_price}` : ""}
                            {item.discount_price === 0 ? `Rs.${item.price}` : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 text-center">
              <Link to="#" className="btn stretched-link borders m-auto">
                <i className="lni lni-reload mr-2"></i>Load More
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
