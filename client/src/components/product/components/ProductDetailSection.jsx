import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance, { baseURL } from "../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";

export default class ProductDetailSection extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      color: 1,
      size: 1,
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
      let res = await axiosInstance.post(`/add-items-to-cart/${this.props.item.slug}/`, {
        quantity: this.state.quantity,
        color: this.state.color,
        size: this.state.size,
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
        quantity: 1,
        color: 1,
        size: 1,
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
    let { item, reviews } = this.props;
    let sum = 0;
    this.props.reviews.forEach(function (review, idx) {
      sum += review.rating;
    });
    
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    };

    return (
      <React.Fragment>
        <section className="middle">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                {/* <div className="sp-loading">
                  <img src="/assets/img/product/15.png" alt="..." />
                  <br />
                  LOADING IMAGES
                </div> */}
                {/* <div className="sp-wrap"> */}
                  <Slider {...settings}>
                    {item.images?.map((image) => {
                      return (
                        <Link to={{ pathname: `${baseURL}${image.image}` }} target="_blank" key={image.image}>
                          <img
                            src={`${baseURL}${image.image}`}
                            alt={image.title}
                            class="w-100"
                          />
                        </Link>
                      );
                    })}
                  </Slider>
                {/* </div> */}
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="prd_details">
                  <div className="prt_01 mb-1">
                    <span className="text-purple bg-light-purple rounded py-1">
                      {item.category?.name}
                    </span>
                  </div>
                  <div className="prt_02 mb-3">
                    <h2 className="ft-bold mb-1">{item.name}</h2>
                    <div className="text-left">
                      <div className="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
                        {(sum/reviews.length) >= 1 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                        {(sum/reviews.length) >= 2 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                        {(sum/reviews.length) >= 3 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                        {(sum/reviews.length) >= 4 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                        {(sum/reviews.length) >= 5 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                        <span className="small">({reviews.length} Reviews)</span>
                      </div>
                      <div className="elis_rty">
                        <span className={item.discount_price !== 0 ? "ft-medium text-muted line-through fs-md mr-2" : "ft-medium text-muted line-through fs-md"}>
                          {item.discount_price !== 0 ? `Rs.${item.price}` : ""}
                        </span>
                        <span className="ft-bold theme-cl fs-lg mr-2">
                          {item.discount_price !== 0 ? `Rs.${item.discount_price}` : `Rs.${item.price}`}
                        </span>
                        {item.stock_count > 0 ? (<span className="ft-regular text-light bg-success py-1 px-2 fs-sm">
                          In Stock
                        </span>) : (<span className="ft-regular text-light bg-warning py-1 px-2 fs-sm">
                          Out of Stock
                        </span>)}
                      </div>
                    </div>
                  </div>

                  <div className="prt_03 mb-4">
                    {item.discount_price ? (<p>Amount Saved: Rs.{item.price - item.discount_price}</p>) : <></>}
                    <p>Stock Count: {item.stock_count}</p>
                  </div>

                  <form method="POST" onSubmit={this.handleSubmit}>
                  {/* Colors */}
                  <div className="prt_04 mb-2">
                    <p className="d-flex align-items-center mb-0 text-dark ft-medium">
                      Color:
                    </p>
                    <div className="text-left">
                      {item.color?.map((color) => {
                        return (
                          <div className="form-check form-option form-check-inline mb-1" key={color.color_code}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="color"
                              id={color?.color_code}
                              value={this.state.color.id}
                              onChange={this.handleInputChange}
                            />
                            <label
                              className="form-option-label rounded-circle"
                              htmlFor={color?.color_code}
                            >
                              <span
                                className="form-option-color rounded-circle"
                                style={{ background: "#" + color?.color_code }}
                              ></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size */}
                  <div className="prt_04 mb-4">
                    <p className="d-flex align-items-center mb-0 text-dark ft-medium">
                      Size:
                    </p>
                    <div className="text-left pb-0 pt-2">
                      {item.size?.map((size) => {
                        return (
                          <div className="form-check size-option form-option form-check-inline mb-2" key={size.size_code}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="size"
                              id={size.size_code}
                              value={this.state.size.id}
                              onChange={this.handleInputChange}
                            />
                            <label className="form-option-label" htmlFor={size.size_code}>
                                {size.size_code}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="prt_05 mb-4">
                    <div className="form-row mb-7">
                      <div className="col-12 col-lg-auto">
                        {/* <!-- Quantity --> */}
                        <input
                          type="number"
                          name="quantity"
                          className="form-control"
                          required="required"
                          data-error="Quantity is required."
                          value={this.state.quantity}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="col-12 col-lg">
                        {/* <!-- Add to Cart --> */}
                        <button
                          type="submit"
                          className="btn btn-block custom-height bg-dark mb-2"
                        >
                          <i className="lni lni-shopping-basket mr-2"></i>Add to
                          Cart
                        </button>
                      </div>
                      <div className="col-12 col-lg-auto">
                        {/* <!-- Wishlist --> */}
                        <button
                          className={item.is_wishlist ? "btn custom-height btn-default btn-block mb-2 bg-primary text-white" : "btn custom-height btn-default btn-block mb-2 text-dark"}
                          data-toggle="button"
                        >
                          <i className="lni lni-heart mr-2"></i>Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                  </form>

                  <div className="prt_06">
                    <p className="mb-0 d-flex align-items-center">
                      <span className="mr-4">Share:</span>
                      <Link
                        className="d-inline-flex align-items-center justify-content-center p-3 gray circle fs-sm text-muted mr-2"
                        to={{ pathname: `https://www.facebook.com/sharer/sharer.php?u=${baseURL}/product/${item.slug}}` }}
                        target="_blank" rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook-f position-absolute"></i>
                      </Link>
                      <Link
                        className="d-inline-flex align-items-center justify-content-center p-3 gray circle fs-sm text-muted mr-2"
                        to={{ pathname: `https://twitter.com/share?url=${baseURL}/product/${item.slug}` }}
                        target="_blank" rel="noopener noreferrer"
                      >
                        <i className="fab fa-twitter position-absolute"></i>
                      </Link>
                      <Link
                        className="d-inline-flex align-items-center justify-content-center p-3 gray circle fs-sm text-muted"
                        to={{ pathname: `https://www.linkedin.com/shareArticle?mini=true&url=${baseURL}/product/${item.slug}` }}
                        target="_blank" rel="noopener noreferrer"
                      >
                        <i className="fab fa-linkedin position-absolute"></i>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
