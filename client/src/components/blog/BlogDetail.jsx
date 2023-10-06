import React, { Component } from 'react';
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import {Link} from 'react-router-dom';
import axiosInstance, { baseURL } from "../api/axiosInstance";
import { useParams } from "react-router-dom";
// import dateFormat from "dateformat";
import ReactHtmlParser from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <BlogDetail {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class BlogDetail extends Component {
  constructor() {
    super();
    this.state = {
      blog_slug: "",
      name: "",
      email: "",
      website: "",
      comment: "",
      blog: {},
      order: [],
      wishlist: [],
      order_subtotal: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.setState({
      slug: this.props.params.slug,
    });
    let res = await axiosInstance.get(`/blog/${this.state.slug}/`);
    let data = await res.data;
    this.setState({
      blog: data.blog,
    });
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
    try{
      let res = await axiosInstance.post(
        `/blog/${this.state.slug}/comment/`,
        {
          name: this.state.name,
          email: this.state.email,
          website: this.state.website,
          comment: this.state.comment,
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
        name: "",
        email: "",
        website: "",
        comment: "",
      });
      let res2 = await axiosInstance.get(`/blog/${this.state.slug}/`);
      let data = await res2.data;
      this.setState({
        blog: data.blog,
      });
    } catch (err) {
      if (err.response.data.message !== undefined){
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
    let blog = this.state.blog;
    return (
      <React.Fragment>
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
                      <li className="breadcrumb-item"><Link to="#">Blogs</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">{blog.title}</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          {/* <!-- ======================= Blog Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row align-items-center justify-content-between">
              
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="abt_caption">
                    <div className="featured-image">
                      <img src={`${baseURL}${blog.image}`} alt={blog.title} className="w-100" />
                    </div>
                    <h2 className="ft-medium mb-4">{blog.title}</h2>
                    <p className="mb-4">{ReactHtmlParser(blog.content)}</p>

                  </div>
                </div>
              </div>
            </div>
          </section>
          <ToastContainer />
          
        </div>

        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    )
  }
}

const PostDetails = withRouter(BlogDetail);

export default PostDetails;