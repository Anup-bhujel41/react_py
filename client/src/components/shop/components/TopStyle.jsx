import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class TopStyle extends Component {
  render() {
    return (
      <React.Fragment>
          <section className="gray">
            <div className="container">
                
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3 text-center">
                        <h1 className="ft-medium mb-3">Shop Categories</h1>
                    </div>
                </div>
                
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4">
                                <div className="cats_side_wrap text-center m-auto">
                                    <div className="sl_cat_01"><div className="d-inline-flex align-items-center justify-content-center p-3 circle mb-2 bg-white"><Link to="/shop/mens" className="d-block"><img src="/assets/img/fashion.png" className="img-fluid" width="40" alt="" /></Link></div></div>
                                    <div className="sl_cat_02"><h6 className="m-0 ft-medium fs-sm"><Link to="/shop/mens">Men's Wear</Link></h6></div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4">
                                <div className="cats_side_wrap text-center m-auto">
                                    <div className="sl_cat_01"><div className="d-inline-flex align-items-center justify-content-center p-3 circle mb-2 bg-white"><Link to="/shop/kids" className="d-block"><img src="/assets/img/tshirt.png" className="img-fluid" width="40" alt="" /></Link></div></div>
                                    <div className="sl_cat_02"><h6 className="m-0 ft-medium fs-sm"><Link to="/shop/kids">Kid's Wear</Link></h6></div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4">
                                <div className="cats_side_wrap text-center m-auto">
                                    <div className="sl_cat_01"><div className="d-inline-flex align-items-center justify-content-center p-3 circle mb-2 bg-white"><Link to="/shop/womens" className="d-block"><img src="/assets/img/accessories.png" className="img-fluid" width="40" alt="" /></Link></div></div>
                                    <div className="sl_cat_02"><h6 className="m-0 ft-medium fs-sm"><Link to="/shop/womens">Women's Wear</Link></h6></div>
                                </div>
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
