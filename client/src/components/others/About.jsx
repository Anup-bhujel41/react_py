import React, { Component } from 'react';
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import {Link} from 'react-router-dom';
import TopBarHeader from "../base/TopBarHeader";
import axiosInstance from "../api/axiosInstance";

export default class About extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      wishlist: [],
      order_subtotal: 0,
    };
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
                      <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                      <li className="breadcrumb-item"><Link to="#">Pages</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">About Us</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          {/* <!-- ======================= About Us Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row align-items-center justify-content-between">
              
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="abt_caption">
                    <h2 className="ft-medium mb-4">We Have Everything You Need ?</h2>
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p className="mb-4">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
                    <div className="form-group mt-4">
                      <Link to="#" className="btn btn-dark">See More Info</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="abt_caption">
                    <img src="/assets/img/about-1.png" className="img-fluid rounded" alt="" />
                  </div>
                </div>
                
              </div>
            </div>
          </section>
          
          {/* <!-- ======================= About Us Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="abt_caption">
                    <img src="/assets/img/about-2.png" className="img-fluid rounded" alt="" />
                  </div>
                </div>
                
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="abt_caption">
                    <h2 className="ft-medium mb-4">Justin Lisiakir</h2>
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p className="mb-4">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
                    <div className="form-group mt-4">
                      <Link to="#" className="btn btn-dark">See More Info</Link>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </section>
        </div>

        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    )
  }
}
