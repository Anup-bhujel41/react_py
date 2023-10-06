import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import FilterProduct from "./components/FilterProduct";
import ProductList from "./components/ProductList";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import TopBarHeader from "../base/TopBarHeader";
import { useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <ProductType {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class ProductType extends Component {
  constructor() {
    super();
    this.state = {
      category_slug: "",
      items: [],
      order: [],
      wishlist: [],
      order_subtotal: 0,
      categories: [],
      price_range: [],
      sizes: [],
      brands: [],
      colors: [],
    };
  }

  async componentDidMount() {
    await this.setState({
      slug: this.props.params.slug,
    });
    let res = await axiosInstance.get(`/product-type/${this.state.slug}/`);
    let data = await res.data;
    this.setState({
      items: data.items,
      categories: data.categories,
      price_range: data.price_range,
      sizes: data.sizes,
      brands: data.brands,
      colors: data.colors,
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
    const capitalizeFirst = slug => {
      return slug?.charAt(0).toUpperCase() + slug?.slice(1);
    };
    let items = this.state.items;
    let slug = this.state.slug;
    return (
      <React.Fragment>
        <TopBarHeader />
        <Header />

        <div>
          {/* <!-- ======================= Shop Style 1 ======================== --> */}
          <section
            className="bg-cover"
            style={{ background: "url(/assets/img/banner-2.png) no-repeat" }}
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="text-left py-5 mt-3 mb-3">
                    <h1 className="ft-medium mb-3">Shop</h1>
                    <ul className="shop_categories_list m-0 p-0">
                      <li>
                        <Link to="/shop/mens">Men</Link>
                      </li>
                      <li>
                        <Link to="/shop/kids">Kids</Link>
                      </li>
                      <li>
                        <Link to="/shop/womens">Women</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- ======================= Filter Wrap Style 1 ======================== --> */}
          <section className="py-3 br-bottom br-top">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="#">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#">Shop</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {capitalizeFirst(slug)}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- ======================= All Products ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row">
                {/* <!-- ======================= Filter Product ======================== --> */}
                <FilterProduct categories={this.state.categories} price_range={this.state.price_range} sizes={this.state.sizes} brands={this.state.brands} colors={this.state.colors} />

                {/* <!-- ======================= Product List ======================== --> */}
                <ProductList items={items} />
              </div>
            </div>
          </section>
        </div>

        <BottomFeatures />
        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}

const ProductTypePage = withRouter(ProductType);

export default ProductTypePage;