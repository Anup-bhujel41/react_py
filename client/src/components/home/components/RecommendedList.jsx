import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance, { baseURL } from "../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default class RecommendedList extends Component {
  async handleWishlistSubmit(item_slug) {
    try {
      let res = await axiosInstance.get(`/add-to-wishlist/${item_slug}/`);
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
    let { recommend_items } = this.props;
    return (
      <React.Fragment>
          <section className="middle">
            <div className="container">
            
              <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="sec_title position-relative text-center">
                    <h2 className="off_title">Best For You</h2>
                    <h3 className="ft-bold pt-3">Recommended Products</h3>
                  </div>
                </div>
              </div>
              
              <div className="row align-items-center rows-products">
              
                {recommend_items?.map((item) => {
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-6 col-6" key={item.slug}>
                      <div className="product_grid card b-0 max-h-card-320">
                        <div className="badge bg-success text-white position-absolute ft-regular ab-left text-upper">Sale</div>
                        <button className={item.is_wishlist ? "btn btn_love position-absolute ab-right snackbar-wishlist bg-primary text-white" : "btn btn_love position-absolute ab-right snackbar-wishlist" } onClick={() => this.handleWishlistSubmit(item.slug)}><i className="far fa-heart"></i></button> 
                        <div className="p-0">
                          <div className="shop_thumb position-relative">
                            <Link className="card-img-top d-block overflow-hidden" to={`/product/${item.slug}`}><img className="card-img-top img-h-250" src={`${baseURL}${item.images[0].image}`} alt={item.name} /></Link>
                            <div className="product-hover-overlay bg-dark d-flex align-items-center justify-content-center">
                              <div className="edlio"><Link to={`/product/${item.slug}`} data-toggle="modal" data-target="#quickview" className="text-white fs-sm ft-medium"><i className="fas fa-eye mr-1"></i>Quick View</Link></div>
                            </div>
                          </div>
                        </div>
                        <div className="card-footers b-0 pt-3 px-2 bg-white d-flex align-items-start justify-content-center">
                          <div className="text-left">
                            <div className="text-center">
                              <h5 className="fw-bolder fs-md mb-0 lh-1 mb-1 max-h-name"><Link to={`/product/${item.slug}`}>{item.name}</Link></h5>
                              <div className="elis_rty"><span className="ft-bold fs-md text-dark">
                                <span className="text-decoration-line-through">{item.discount_price !== 0 ? `Rs.${item.price}` : ""}</span> {item.discount_price !== 0 ? ` - Rs.${item.discount_price}` : ""}
                                {item.discount_price === 0 ? `Rs.${item.price}` : ""}
                              </span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
              </div>
              
              <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="position-relative text-center">
                    <Link to="/shop" className="btn stretched-link borders">Explore More<i className="lni lni-arrow-right ml-2"></i></Link>
                  </div>
                </div>
              </div>
              
            </div>
          </section>
      </React.Fragment>
    )
  }
}
