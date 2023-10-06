import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import { Link } from "react-router-dom";
import TopBarHeader from "../base/TopBarHeader";
import axiosInstance from "../api/axiosInstance";

export default class FAQ extends Component {
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
                        FAQ's
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= FAQ's Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="sec_title position-relative text-center">
                    <h2 className="off_title">FAQ's Section</h2>
                    <h3 className="ft-bold pt-3">Frequently Asked Questions</h3>
                  </div>
                </div>
              </div>

              <div className="row align-items-center justify-content-between">
                <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
                  <div className="d-block position-relative border rounded py-3 px-3 mb-4">
                    <h4 className="ft-medium">Orders:</h4>
                    <div id="accordion" className="accordion">
                      <div className="card">
                        <div className="card-header" id="h1">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              data-toggle="collapse"
                              data-target="#ord1"
                              aria-expanded="true"
                              aria-controls="ord1"
                            >
                              Can I track my order item?
                            </button>
                          </h5>
                        </div>

                        <div
                          id="ord1"
                          className="collapse show"
                          aria-labelledby="h1"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="h2">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              data-toggle="collapse"
                              data-target="#ord2"
                              aria-expanded="false"
                              aria-controls="ord2"
                            >
                              Who pays for return postage?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="ord2"
                          className="collapse"
                          aria-labelledby="h2"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="h3">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              data-toggle="collapse"
                              data-target="#ord3"
                              aria-expanded="false"
                              aria-controls="ord3"
                            >
                              How do I apply a promotional code?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="ord3"
                          className="collapse"
                          aria-labelledby="h3"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-block position-relative border rounded py-3 px-3 mb-4">
                    <h4 className="ft-medium">Shipping & Returns:</h4>
                    <div id="accordion1" className="accordion">
                      <div className="card">
                        <div className="card-header" id="h4">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              data-toggle="collapse"
                              data-target="#ord4"
                              aria-expanded="true"
                              aria-controls="ord4"
                            >
                              How long does it take for home delivery?
                            </button>
                          </h5>
                        </div>

                        <div
                          id="ord4"
                          className="collapse show"
                          aria-labelledby="h4"
                          data-parent="#accordion1"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="h5">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              data-toggle="collapse"
                              data-target="#ord5"
                              aria-expanded="false"
                              aria-controls="ord5"
                            >
                              What courier do you use for deliveries?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="ord5"
                          className="collapse"
                          aria-labelledby="h5"
                          data-parent="#accordion1"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="h6">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              data-toggle="collapse"
                              data-target="#ord6"
                              aria-expanded="false"
                              aria-controls="ord6"
                            >
                              Can I collect from a local store?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="ord6"
                          className="collapse"
                          aria-labelledby="h6"
                          data-parent="#accordion1"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-block position-relative border rounded py-3 px-3">
                    <h4 className="ft-medium">Payment:</h4>
                    <div id="accordion2" className="accordion">
                      <div className="card">
                        <div className="card-header" id="h7">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              data-toggle="collapse"
                              data-target="#ord7"
                              aria-expanded="true"
                              aria-controls="ord7"
                            >
                              Do you offer a VAT discount to non EU customers?
                            </button>
                          </h5>
                        </div>

                        <div
                          id="ord7"
                          className="collapse show"
                          aria-labelledby="h7"
                          data-parent="#accordion2"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="h8">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              data-toggle="collapse"
                              data-target="#ord8"
                              aria-expanded="false"
                              aria-controls="ord8"
                            >
                              Why have you not refunded the original delivery
                              charge?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="ord8"
                          className="collapse"
                          aria-labelledby="h8"
                          data-parent="#accordion2"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="h9">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              data-toggle="collapse"
                              data-target="#ord9"
                              aria-expanded="false"
                              aria-controls="ord9"
                            >
                              Do you offer a VAT discount to non EU customers?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="ord9"
                          className="collapse"
                          aria-labelledby="h9"
                          data-parent="#accordion2"
                        >
                          <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred
                            nesciunt sapiente ea proident. Ad vegan excepteur
                            butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore
                            sustainable VHS.
                          </div>
                        </div>
                      </div>
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
    );
  }
}
