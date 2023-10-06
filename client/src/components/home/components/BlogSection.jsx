import React, { Component } from "react";
import { Link } from "react-router-dom";
import dateFormat from 'dateformat';
import { baseURL } from "../../api/axiosInstance";

export default class BlogSection extends Component {
  render() {
    let { blogs } = this.props;
    return (
      <React.Fragment>
        <section className="space min">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="sec_title position-relative text-center">
                  <h2 className="off_title">Latest News</h2>
                  <h3 className="ft-bold pt-3">New Updates</h3>
                </div>
              </div>
            </div>

            <div className="row">

              {blogs?.map((blog) => {
                return (
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12" key={blog.slug}>
                    <div className="_blog_wrap">
                      <div className="_blog_thumb mb-2">
                        <Link to={`/blogs/${blog.slug}`} className="d-block">
                          <img
                            src={`${baseURL}${blog.image}`}
                            className="img-fluid rounded"
                            alt={blog.title}
                          />
                        </Link>
                      </div>
                      <div className="_blog_caption">
                        <span className="text-muted">{dateFormat(blog.created_on, "mmmm dS, yyyy")}</span>
                        <h5 className="bl_title lh-1">
                          <Link to={`/blogs/${blog.slug}`}>
                            {blog.title}
                          </Link>
                        </h5>
                        <p>
                          {blog.metades}
                        </p>
                        <Link to={`/blogs/${blog.slug}`} className="text-dark fs-sm">
                          Continue Reading..
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
