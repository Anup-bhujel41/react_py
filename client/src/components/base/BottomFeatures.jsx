import React, { Component } from 'react'

export default class BottomFeatures extends Component {
  render() {
    return (
        <React.Fragment>
          <section className="px-0 py-3 br-top">
            <div className="container">
                <div className="row">
                    
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="d-flex align-items-center justify-content-start py-2">
                            <div className="d_ico">
                                <i className="fas fa-shopping-basket"></i>
                            </div>
                            <div className="d_capt">
                                <h5 className="mb-0">Free Shipping</h5>
                                <span className="text-muted">Capped at Rs.10 per order</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="d-flex align-items-center justify-content-start py-2">
                            <div className="d_ico">
                                <i className="far fa-credit-card"></i>
                            </div>
                            <div className="d_capt">
                                <h5 className="mb-0">Secure Payments</h5>
                                <span className="text-muted">Up to 6 months installments</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="d-flex align-items-center justify-content-start py-2">
                            <div className="d_ico">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <div className="d_capt">
                                <h5 className="mb-0">15-Days Returns</h5>
                                <span className="text-muted">Shop with fully confidence</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="d-flex align-items-center justify-content-start py-2">
                            <div className="d_ico">
                                <i className="fas fa-headphones-alt"></i>
                            </div>
                            <div className="d_capt">
                                <h5 className="mb-0">24x7 Fully Support</h5>
                                <span className="text-muted">Get friendly support</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        </React.Fragment>
    )
  }
}
