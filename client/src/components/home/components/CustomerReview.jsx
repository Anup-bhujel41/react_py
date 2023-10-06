import React, { Component } from "react";

export default class CustomerReview extends Component {
  render() {
    let { testimonials } = this.props;
    return (
      <React.Fragment>
        <section className="gray">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="sec_title position-relative text-center">
                  <h2 className="off_title">Testimonials</h2>
                  <h3 className="ft-bold pt-3">Client Reviews</h3>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12">
                <div className="reviews-slide px-3">

                  {testimonials?.map((testimonial) => {
                    return (
                      <div className="single_review">
                        <div className="sng_rev_thumb">
                          <figure>
                            <img
                              src="/assets/img/team-1.jpg"
                              className="img-fluid circle"
                              alt={testimonial.name}
                            />
                          </figure>
                        </div>
                        <div className="sng_rev_caption text-center">
                          <div className="rev_desc mb-4">
                            <p className="fs-md">
                              {testimonial.description}
                            </p>
                          </div>
                          <div className="rev_author">
                            <h4 className="mb-0">{testimonial.name}</h4>
                            <span className="fs-sm">{testimonial.title}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
