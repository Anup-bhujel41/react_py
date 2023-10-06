import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import { Link } from "react-router-dom";
import axiosInstance, { baseURL } from "../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      full_name: "",
      phone_number: "",
      street_address: "",
      apartment_address: "",
      default: "false",
      use_default: "false",
      order: {},
      subtotal: 0,
      total: 0,
      wishlist: [],
      address: {},
      order_subtotal: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.useDefaultAddress = this.useDefaultAddress.bind(this);
  }

  async componentDidMount() {
    let res1 = await axiosInstance.get(`/order-cart/`);
    let data1 = await res1.data;
    this.setState({
      order: data1.order,
      subtotal: data1.subtotal,
      total: data1.total,
      order_subtotal: data1.subtotal,
    });
    let res2 = await axiosInstance.get(`/wishlist/`);
    let data2 = await res2.data;
    this.setState({
      wishlist: data2.wishlist,
    });
    let res3 = await axiosInstance.get(`/addresses/`);
    let data3 = await res3.data;
    for (var i = 0; i < data3.addresses.length; i++) {
      if (data3.addresses[i].default === true) {
        this.setState({
          address: data3.addresses[i],
        });
      }
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "default") {
      if (this.state.default === "false") {
        this.setState({
          default: "true",
        });
      } else {
        this.setState({
          default: "false",
        });
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.use_default === "false") {
      try {
        let res = await axiosInstance.post(`/addresses/`, {
          full_name: this.state.full_name,
          phone_number: this.state.phone_number,
          street_address: this.state.street_address,
          apartment_address: this.state.apartment_address,
          default: this.state.default,
        });
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
          full_name: "",
          phone_number: "",
          street_address: "",
          apartment_address: "",
          default: "false",
          address: res.data.address,
        });
      } catch (err) {
        if (err.response.data.message !== undefined) {
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



    try {
      let res1 = await axiosInstance.post(`/checkout/`, {
        address: this.state.address,
      });
      toast.success(res1.data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      // window.location = "/complete-order";

      window.location = "/checkout-form"
    } catch (err) {
      if (err.response.data.message !== undefined) {
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

  useDefaultAddress() {
    if (document.getElementById("hideable_shipping_form").style.display === "none") {
      this.setState({
        use_default: "false",
      });
      document.getElementById("hideable_shipping_form").style.display = "block";
      document.getElementsByName("full_name")[0].required = true;
      document.getElementsByName("phone_number")[0].required = true;
      document.getElementsByName("street_address")[0].required = true;
      document.getElementsByName("city")[0].required = true;
    } else {
      this.setState({
        use_default: "true",
      });
      document.getElementById("hideable_shipping_form").style.display = "none";
      document.getElementsByName("full_name")[0].required = false;
      document.getElementsByName("phone_number")[0].required = false;
      document.getElementsByName("street_address")[0].required = false;
      document.getElementsByName("city")[0].required = false;
    }
  }

  render() {
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
                        <Link to="#">Support</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Checkout
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= Product Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="text-center d-block mb-5">
                    <h2>Checkout</h2>
                  </div>
                </div>
              </div>

              <form method="post" onSubmit={this.handleSubmit}>
                <div className="row justify-content-between">
                  <div className="col-12 col-lg-7 col-md-12">
                    <div className="row">
                      <div className="col-12 col-lg-12 col-xl-12 col-md-12 mb-3">
                        <h4 className="ft-medium fs-lg">Add New Address</h4>
                      </div>
                    </div>

                    <div id="hideable_shipping_form">
                      <div className="row mb-2">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-dark">Full Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              name="full_name"
                              required
                              data-error="Name is required."
                              value={this.state.full_name}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-dark">Phone Number *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Mobile Number"
                              name="phone_number"
                              required="required"
                              data-error="Phone number is required."
                              value={this.state.phone_number}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-dark">Address 1 *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address 1"
                              name="street_address"
                              required="required"
                              data-error="Address is required."
                              value={this.state.street_address}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-dark">Address 2</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address 2"
                              name="apartment_address"
                              value={this.state.apartment_address}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-dark">
                              City / District *
                            </label>
                            <select
                              className="form-control custom-select"
                              name="city"
                              defaultValue={this.state.city}
                              onChange={this.handleInputChange}
                            >
                              {/* Provision 1 */}
                              <option value="Bhojpur">Bhojpur</option>
                              <option value="Dhankuta">Dhankuta</option>
                              <option value="Ilam">Ilam</option>
                              <option value="Khotang">Khotang</option>
                              <option value="Jhapa">Jhapa</option>
                              <option value="Morang">Morang</option>
                              <option value="Okhaldhunga">Okhaldhunga</option>
                              <option value="Panchthar">Panchthar</option>
                              <option value="Sankhuwasabha">
                                Sankhuwasabha
                              </option>
                              <option value="Solukhumbu">Solukhumbu</option>
                              <option value="Sunsari">Sunsari</option>
                              <option value="Taplejung">Taplejung</option>
                              <option value="Terhathum">Terhathum</option>
                              <option value="Udayapur">Udayapur</option>
                              {/* Provision 2 */}
                              <option value="Bara">Bara</option>
                              <option value="Dhanusa">Dhanusa</option>
                              <option value="Mahottari">Mahottari</option>
                              <option value="Parsa">Parsa</option>
                              <option value="Rautahat">Rautahat</option>
                              <option value="Saptari">Saptari</option>
                              <option value="Sarlahi">Sarlahi</option>
                              <option value="Siraha">Siraha</option>
                              {/* Provision 3 */}
                              <option value="Bhaktapur">Bhaktapur</option>
                              <option value="Chitwan">Chitwan</option>
                              <option value="Dhading">Dhading</option>
                              <option value="Dolakha">Dolakha</option>
                              <option value="Kathmandu">Kathmandu</option>
                              <option value="Kavrepalanchok">
                                Kavrepalanchok
                              </option>
                              <option value="Lalitpur">Lalitpur</option>
                              <option value="Makawanpur">Makawanpur</option>
                              <option value="Nuwakot">Nuwakot</option>
                              <option value="Ramechhap">Ramechhap</option>
                              <option value="Rasuwa">Rasuwa</option>
                              <option value="Sindhuli">Sindhuli</option>
                              <option value="Sindhupalchok">
                                Sindhupalchok
                              </option>
                              {/* Provision 4 */}
                              <option value="Baglung">Baglung</option>
                              <option value="Gorkha">Gorkha</option>
                              <option value="Kaski">Kaski</option>
                              <option value="Lamjung">Lamjung</option>
                              <option value="Manang">Manang</option>
                              <option value="Mustang">Mustang</option>
                              <option value="Myagdi">Myagdi</option>
                              <option value="Nawalparasi (Bardaghat Susta Purva)">
                                Nawalparasi (Bardaghat Susta Purva)
                              </option>
                              <option value="Parbat">Parbat</option>
                              <option value="Syangja">Syangja</option>
                              <option value="Tanahu">Tanahu</option>
                              {/* Provision 5 */}
                              <option value="Arghakhanchi">Arghakhanchi</option>
                              <option value="Banke">Banke</option>
                              <option value="Bardiya">Bardiya</option>
                              <option value="Dang">Dang</option>
                              <option value="Gulmi">Gulmi</option>
                              <option value="Kapilvastu">Kapilvastu</option>
                              <option value="Nawalparasi (Bardaghat Susta Paschim)">
                                Nawalparasi (Bardaghat Susta Paschim)
                              </option>
                              <option value="Palpa">Palpa</option>
                              <option value="Pyuthan">Pyuthan</option>
                              <option value="Rolpa">Rolpa</option>
                              <option value="Purbi Rukum">Purbi Rukum</option>
                              <option value="Rupandehi">Rupandehi</option>
                              {/* Provision 6 */}
                              <option value="Dailekh">Dailekh</option>
                              <option value="Dolpa">Dolpa</option>
                              <option value="Humla">Humla</option>
                              <option value="Jajarkot">Jajarkot</option>
                              <option value="Jumla">Jumla</option>
                              <option value="Kalikot">Kalikot</option>
                              <option value="Mugu">Mugu</option>
                              <option value="Rukum Paschim">
                                Rukum Paschim
                              </option>
                              <option value="Salyan">Salyan</option>
                              <option value="Surkhet">Surkhet</option>
                              {/* Provision 7 */}
                              <option value="Achham">Achham</option>
                              <option value="Baitadi">Baitadi</option>
                              <option value="Bajhang">Bajhang</option>
                              <option value="Bajura">Bajura</option>
                              <option value="Dadeldhura">Dadeldhura</option>
                              <option value="Darchula">Darchula</option>
                              <option value="Doti">Doti</option>
                              <option value="Kailali">Kailali</option>
                              <option value="Kanchanpur">Kanchanpur</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <input
                              id="delivery"
                              className="checkbox-custom"
                              name="default"
                              type="checkbox"
                              value={this.state.default}
                              onChange={this.handleInputChange}
                            />
                            <label
                              htmlFor="delivery"
                              className="checkbox-custom-label"
                            >
                              Set Default delivery address
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <input
                            id="default"
                            className="checkbox-custom"
                            type="checkbox"
                            onClick={this.useDefaultAddress}
                          />
                          <label
                            htmlFor="default"
                            className="checkbox-custom-label"
                          >
                            Use default shipping address:{" "}
                            {this.state.address?.street_address}
                          </label>
                        </div>
                      </div>
                    </div>

                    <h5 className="mb-4 ft-medium">Payments</h5>
                    <div className="row mb-4">
                      <div className="col-12 col-lg-12 col-xl-12 col-md-12">
                        <div
                          className="panel-group pay_opy980"
                          id="payaccordion"
                        >
                          {/* <!-- Pay By Paypal --> */}
                          <div className="panel panel-default border">
                            <div className="panel-heading" id="pay">
                              <h4 className="panel-title">
                                <Link
                                  to="#"
                                  data-toggle="collapse"
                                  role="button"
                                  aria-expanded="true"
                                  aria-controls="payPal"
                                  className=""
                                >
                                  Cash on Delivery
                                  <img
                                    src="assets/img/paypal.html"
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Link>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 col-md-12">
                    <div className="d-block mb-3">
                      <h5 className="mb-4">
                        Order Items ({this.state.order.items?.length})
                      </h5>
                      <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x mb-4">
                        {this.state.order.items?.map((item) => {
                          return (
                            <li className="list-group-item" key={item.id}>
                              <div className="row align-items-center">
                                <div className="col-3">
                                  <Link to={`/product/${item.item.slug}`}>
                                    <img
                                      src={`${baseURL}${item.item.images[0].image}`}
                                      alt={item.item.name}
                                      className="img-fluid"
                                    />
                                  </Link>
                                </div>
                                <div className="col d-flex align-items-center">
                                  <div className="cart_single_caption pl-2">
                                    <h4 className="product_title fs-md ft-medium mb-1 lh-1">
                                      {item.item.name}
                                    </h4>
                                    <p className="mb-1 lh-1">
                                      <span className="text-dark">
                                        Size: {item.size.name}
                                      </span>
                                    </p>
                                    <p className="mb-1 lh-1">
                                      <span className="text-dark">
                                        Color: {item.color.name}
                                      </span>
                                    </p>
                                    <p className="mb-2 lh-1">
                                      <span className="text-dark">
                                        Price: Rs.{item.selling_price}
                                      </span>
                                    </p>
                                    <h4 className="fs-md ft-medium mb-3 lh-1">
                                      Total: Rs.
                                      {item.selling_price * item.quantity}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="card mb-4 gray">
                      <div className="card-body">
                        <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                          <li className="list-group-item d-flex text-dark fs-sm ft-regular">
                            <span>Subtotal</span>{" "}
                            <span className="ml-auto text-dark ft-medium">
                              Rs.{this.state.subtotal}
                            </span>
                          </li>
                          <li className="list-group-item d-flex text-dark fs-sm ft-regular">
                            <span>Discount</span>{" "}
                            <span className="ml-auto text-dark ft-medium">
                              Rs.
                              {this.state.order.coupon != null
                                ? this.state.order.coupon.amount
                                : 0}
                            </span>
                          </li>
                          <li className="list-group-item d-flex text-dark fs-sm ft-regular">
                            <span>Total</span>{" "}
                            <span className="ml-auto text-dark ft-medium">
                              Rs.{this.state.total}
                            </span>
                          </li>
                          <li className="list-group-item fs-sm text-center">
                            Shipping cost calculated at Checkout *
                          </li>
                        </ul>
                      </div>
                    </div>

                    <button
                      className="btn btn-block btn-dark mb-3"
                      type="submit"
                    >
                      Place Your Order
                    </button>
                  </div>
                </div>
              </form>
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
