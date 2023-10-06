import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TopCategory extends Component {
  render() {
    return (
      <React.Fragment>
          <section className="p-0">
            <div className="container-fluid p-0">
              <div className="row no-gutters">
              
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="/shop/mens" className="card card-overflow card-scale no-radius mb-0">
                  <div className="bg-image" style={{"background": "url(assets/img/lamrin_photo.jpg)no-repeat"}} data-overlay="2"></div>
                    <div className="ct_body">
                      <div className="ct_body_caption">	
                        <h1 className="mb-0 ft-bold text-light">Mens</h1>
                      </div>
                      <div className="ct_footer">
                        <span className="btn btn-white stretched-link">Shop Mens <i className="lni lni-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="/shop/kids" className="card card-overflow card-scale no-radius mb-0">
                  <div className="bg-image" style={{"background": "url(assets/img/kids_photo.jpg)no-repeat"}} data-overlay="2"></div>
                    <div className="ct_body">
                      <div className="ct_body_caption">	
                        <h1 className="mb-0 ft-bold text-light">Kids</h1>
                      </div>
                      <div className="ct_footer">
                        <span className="btn btn-white stretched-link">Shop Kids <i className="lni lni-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="/shop/womens" className="card card-overflow card-scale no-radius mb-0">
                  <div className="bg-image" style={{"background": "url(assets/img/jyoti_photo.jpg)no-repeat"}} data-overlay="2"></div>
                    <div className="ct_body">
                      <div className="ct_body_caption">	
                        <h1 className="mb-0 ft-bold text-light">Womens</h1>
                      </div>
                      <div className="ct_footer">
                        <span className="btn btn-white stretched-link">Shop Womens <i className="lni lni-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                
              </div>
            </div>
          </section>
      </React.Fragment>
    )
  }
}
