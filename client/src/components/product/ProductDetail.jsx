import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
// import BottomFeatures from "../base/BottomFeatures";
import ProductDetailSection from "./components/ProductDetailSection";
import ProductDescription from "./components/ProductDescription";
import RecommendedProducts from "./components/RecommendedProducts";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <ProductDetail {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      item_slug: "",
      item: {},
      related_products: [],
      reviews: [],
      order: [],
      wishlist: [],
      order_subtotal: 0,
    };
  }

  async componentDidMount() {
    await this.setState({
      slug: this.props.params.slug,
    });
    let res = await axiosInstance.get(`/product/${this.state.slug}/`);
    let data = await res.data;
    this.setState({
        item: data.item,
        related_products: data.related_products,
        reviews: data.reviews,
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

  render() {
    let item = this.state.item;
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
                      <li className="breadcrumb-item">
                        <Link to="#">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#">{item.category?.name}</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {item.name}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= Product Detail ======================== --> */}
          <ProductDetailSection item={item} reviews={this.state.reviews} />

          {/* <!-- ======================= Product Description ======================= --> */}
          <ProductDescription item={item} reviews={this.state.reviews} />

          {/* <!-- ======================= Recommended Products ============================ --> */}
          <RecommendedProducts related_products={this.state.related_products} />
        </div>
        <ToastContainer />

        {/* <BottomFeatures /> */}
        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}

const ItemDetail = withRouter(ProductDetail);

export default ItemDetail;
