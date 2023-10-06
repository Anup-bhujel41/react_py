import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import ReactHtmlParser from "react-html-parser";
import dateFormat from "dateformat";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <ProductDescription {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      t_description: true,
      information: false,
      review: false,
      username: "admin",
      item: {},
      rating: 0,
      description: "",
      reviews: [],
    };
    this.handleDescClick = this.handleDescClick.bind(this);
    this.handleInfClick = this.handleInfClick.bind(this);
    this.handleRevClick = this.handleRevClick.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.setState({
      item: this.props.params.item,
      reviews: this.props.params.reviews,
    });
  }

  handleDescClick() {
    this.setState({
      t_description: true,
      information: false,
      review: false,
    });
  }

  handleInfClick() {
    this.setState({
      t_description: false,
      information: true,
      review: false,
    });
  }

  handleRevClick() {
    this.setState({
      t_description: false,
      information: false,
      review: true,
    });
  }

  handleRatingChange(event) {
    const target = event.target;
    const value = target.value;

    if (value === "star-1") {
      this.setState({
        rating: 1,
      });
    }
    if (value === "star-2") {
      this.setState({
        rating: 2,
      });
    }
    if (value === "star-3") {
      this.setState({
        rating: 3,
      });
    }
    if (value === "star-4") {
      this.setState({
        rating: 4,
      });
    }
    if (value === "star-5") {
      this.setState({
        rating: 5,
      });
    }
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
      console.log(this.props.item);
      let res = await axiosInstance.post(
        `/product/${this.props.item.slug}/review/`,
        {
          username: this.state.username,
          rating: this.state.rating,
          description: this.state.description,
        }
      );
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
        rating: 0,
        description: "",
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
    let res2 = await axiosInstance.get(`/product/${this.props.item.slug}/`);
    let data = await res2.data;
    this.setState({
      item: data.item,
      reviews: data.reviews,
    });
  }

  render() {
    let {item, reviews} = this.props;
    return (
      <React.Fragment>
        <section className="middle">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-11 col-lg-12 col-md-12 col-sm-12">
                <ul
                  className="nav nav-tabs b-0 d-flex align-items-center justify-content-center simple_tab_links mb-4"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <Link
                      className="nav-link active"
                      id="description-tab"
                      to="#description"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                      onClick={this.handleDescClick}
                    >
                      Description
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link
                      className="nav-link"
                      to="#information"
                      id="information-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="information"
                      aria-selected="false"
                      onClick={this.handleInfClick}
                    >
                      Additional information
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link
                      className="nav-link"
                      to="#reviews"
                      id="reviews-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="reviews"
                      aria-selected="false"
                      onClick={this.handleRevClick}
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  {/* <!-- Description Content --> */}
                  <div
                    className={
                      this.state.t_description ? "tab-pane fade show active" : "tab-pane fade"
                    }
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <div className="description_info">
                      <p className="p-0 mb-2">
                        {ReactHtmlParser(item.description)}
                      </p>
                    </div>
                  </div>

                  {/* <!-- Additional Content --> */}
                  <div
                    className={
                      this.state.information
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    id="information"
                    role="tabpanel"
                    aria-labelledby="information-tab"
                  >
                    <div className="additionals">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th className="ft-medium text-dark">
                              Product Type
                            </th>
                            <td>{item.product_type}</td>
                          </tr>
                          <tr>
                            <th className="ft-medium text-dark">Category</th>
                            <td>{item.category?.name}</td>
                          </tr>
                          <tr>
                            <th className="ft-medium text-dark">Subcategory</th>
                            <td>{item.subcategory?.name}</td>
                          </tr>
                          <tr>
                            <th className="ft-medium text-dark">Brand</th>
                            <td>{item.brand?.name}</td>
                          </tr>
                          <tr>
                            <th className="ft-medium text-dark">Stock Qty</th>
                            <td>{item.stock_count}</td>
                          </tr>
                          <tr>
                            <th className="ft-medium text-dark">Price</th>
                            <td>Rs.{item.price}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* <!-- Reviews Content --> */}
                  <div
                    className={
                      this.state.review
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    id="reviews"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                  >
                    <div className="reviews_info">
                      {reviews?.map((review) => {
                        return (
                          <div className="single_rev d-flex align-items-start br-bottom py-3">
                            <div className="single_rev_thumb">
                              <img
                                src="/assets/img/team-1.jpg"
                                className="img-fluid circle"
                                width="80"
                                alt="Review"
                              />
                            </div>
                            <div className="single_rev_caption d-flex align-items-start pl-3">
                              <div className="single_capt_left">
                                <h5 className="mb-0 fs-md ft-medium lh-1">
                                  {review.user.first_name}{" "}{review.user.last_name}
                                </h5>
                                <span className="small">
                                  {dateFormat(
                                    review.review_date,
                                    "mmmm dS, yyyy"
                                  )}
                                </span>
                                <div className="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
                                  {review.rating >= 1 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                                  {review.rating >= 2 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                                  {review.rating >= 3 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                                  {review.rating >= 4 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                                  {review.rating >= 5 ? (<i className="fas fa-star filled"></i>) : (<i className="fas fa-star"></i>)}
                                </div>
                                <p>{review.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="reviews_rate">
                      <form
                        className="row"
                        method="post"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <h4>Submit Rating</h4>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="revie_stars d-flex align-items-center justify-content-between px-2 py-2 gray rounded mb-2 mt-1">
                            <div className="srt_013">
                              <div className="submit-rating">
                                <input
                                  id="star-5"
                                  type="radio"
                                  name="rating"
                                  required="required"
                                  value="star-5"
                                  onChange={this.handleRatingChange}
                                />
                                <label htmlFor="star-5" title="5 stars">
                                  <i
                                    className="active fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                </label>
                                <input
                                  id="star-4"
                                  type="radio"
                                  name="rating"
                                  value="star-4"
                                  onChange={this.handleRatingChange}
                                />
                                <label htmlFor="star-4" title="4 stars">
                                  <i
                                    className="active fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                </label>
                                <input
                                  id="star-3"
                                  type="radio"
                                  name="rating"
                                  value="star-3"
                                  onChange={this.handleRatingChange}
                                />
                                <label htmlFor="star-3" title="3 stars">
                                  <i
                                    className="active fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                </label>
                                <input
                                  id="star-2"
                                  type="radio"
                                  name="rating"
                                  value="star-2"
                                  onChange={this.handleRatingChange}
                                />
                                <label htmlFor="star-2" title="2 stars">
                                  <i
                                    className="active fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                </label>
                                <input
                                  id="star-1"
                                  type="radio"
                                  name="rating"
                                  value="star-1"
                                  onChange={this.handleRatingChange}
                                />
                                <label htmlFor="star-1" title="1 star">
                                  <i
                                    className="active fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                </label>
                              </div>
                            </div>

                            <div className="srt_014">
                              <h6 className="mb-0">{this.state.rating} Star</h6>
                            </div>
                          </div>
                        </div>

                        <input
                          type="hidden"
                          name="rating"
                          value={this.state.rating}
                        />

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="medium text-dark ft-medium">
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              name="description"
                              required="required"
                              onChange={this.handleInputChange}
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group m-0">
                            <button
                              type="submit"
                              className="btn btn-white stretched-link hover-black"
                            >
                              Submit Review{" "}
                              <i className="lni lni-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
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

const ProductDesc = withRouter(ProductDescription);

export default ProductDesc;