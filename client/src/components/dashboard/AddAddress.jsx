import React, { Component } from "react";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Modal from "../base/Modal";
import BottomFeatures from "../base/BottomFeatures";
import SidebarDashboard from "./components/SidebarDashboard";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class AddAddress extends Component {
  constructor() {
    super();
    this.state = {
      full_name: "",
      phone_number: "",
      street_address: "",
      apartment_address: "",
      default: "false",
      order: [],
      wishlist: [],
      order_subtotal: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "default"){
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
      });
      window.location = "/addresses";
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
                        <Link to="#">Dashboard</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Add New Address
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- ======================= Dashboard Detail ======================== --> */}
          <section className="middle">
            <div className="container">
              <div className="row align-items-start justify-content-between">
                <SidebarDashboard />

                <div className="col-12 col-md-12 col-lg-8 col-xl-8">
                  <form method="post" onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-12 col-lg-12 col-xl-12 col-md-12 mb-3">
                        <h4 className="ft-medium fs-lg">Add New Address</h4>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <label className="text-dark">Full Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            name="full_name"
                            required="required"
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
                          <label className="text-dark">City / District *</label>
                          <select className="form-control custom-select" name="city" defaultValue={this.state.city} onChange={this.handleInputChange}>
                            {/* Provision 1 */}
														<option value="Bhojpur">Bhojpur</option>
														<option value="Dhankuta">Dhankuta</option>
                            <option value="Ilam">Ilam</option>
														<option value="Khotang">Khotang</option>
                            <option value="Jhapa">Jhapa</option>
                            <option value="Morang">Morang</option>
														<option value="Okhaldhunga">Okhaldhunga</option>
                            <option value="Panchthar">Panchthar</option>
														<option value="Sankhuwasabha">Sankhuwasabha</option>
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
                            <option value="Kavrepalanchok">Kavrepalanchok</option>
														<option value="Lalitpur">Lalitpur</option>
                            <option value="Makawanpur">Makawanpur</option>
                            <option value="Nuwakot">Nuwakot</option>
                            <option value="Ramechhap">Ramechhap</option>
														<option value="Rasuwa">Rasuwa</option>
                            <option value="Sindhuli">Sindhuli</option>
                            <option value="Sindhupalchok">Sindhupalchok</option>
                            {/* Provision 4 */}
                            <option value="Baglung">Baglung</option>
														<option value="Gorkha">Gorkha</option>
                            <option value="Kaski">Kaski</option>
														<option value="Lamjung">Lamjung</option>
                            <option value="Manang">Manang</option>
                            <option value="Mustang">Mustang</option>
														<option value="Myagdi">Myagdi</option>
                            <option value="Nawalparasi (Bardaghat Susta Purva)">Nawalparasi (Bardaghat Susta Purva)</option>
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
                            <option value="Nawalparasi (Bardaghat Susta Paschim)">Nawalparasi (Bardaghat Susta Paschim)</option>
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
                            <option value="Rukum Paschim">Rukum Paschim</option>
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

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group text-center">
                          <button type="submit" className="btn btn-dark full-width">
                            Add & Save card
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ToastContainer />

        <BottomFeatures />
        <Footer />
        <Modal order={this.state.order} order_subtotal={this.state.order_subtotal} wishlist={this.state.wishlist} />
      </React.Fragment>
    );
  }
}
