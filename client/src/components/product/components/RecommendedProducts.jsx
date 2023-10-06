import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { baseURL } from "../../api/axiosInstance";
import Slider from "react-slick";

export default class RecommendedProducts extends Component {
  render() {
    let { related_products } = this.props;

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };
    
    return (
      <React.Fragment>
          <section className="middle pt-0">
            <div className="container">
                
                <div className="row justify-content-center">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="sec_title position-relative text-center">
                            <h2 className="off_title">Similar Products</h2>
                            <h3 className="ft-bold pt-3">Recommended Products</h3>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">

                        <Slider {...settings}>
                            {related_products?.map((item) => {
                            return (
                                <div className="single_itesm" key={item.slug}>
                                    <div className="product_grid card b-0 mb-0">
                                        <div className="badge bg-info text-white position-absolute ft-regular ab-left text-upper">New</div>
                                        <button className={item.is_wishlist ? "snackbar-wishlist btn btn_love position-absolute ab-right bg-primary text-white" : "snackbar-wishlist btn btn_love position-absolute ab-right" }><i className="far fa-heart"></i></button> 
                                        <div className="card-body p-0">
                                            <div className="shop_thumb position-relative">
                                                <Link className="card-img-top d-block overflow-hidden" to={`/product/${item.slug}`}><img className="card-img-top img-h-250" src={`${baseURL}${item.images[0].image}`} alt={item.name} /></Link>
                                                <div className="product-hover-overlay bg-dark d-flex align-items-center justify-content-center">
                                                    <div className="edlio"><Link to="#" data-toggle="modal" data-target="#quickview" className="text-white fs-sm ft-medium"><i className="fas fa-eye mr-1"></i>Quick View</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer b-0 p-3 pb-0 d-flex align-items-start justify-content-center">
                                            <div className="text-left">
                                                <div className="text-center">
                                                    <h5 className="fw-bolder fs-md mb-0 lh-1 mb-1"><Link to={`/product/${item.slug}`}>{item.name}</Link></h5>
                                                    <div className="elis_rty"><span className="text-muted ft-medium line-through mr-2">Rs.{item.price}</span><span className="ft-bold theme-cl fs-md">Rs.{item.price}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                            })}
                        </Slider>
                            
                    </div>
                </div>
                
            </div>
        </section>
      </React.Fragment>
    )
  }
}
