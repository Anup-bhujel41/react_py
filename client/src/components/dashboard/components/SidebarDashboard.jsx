import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SidebarDashboard extends Component {
  handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      let res = await axiosInstance.post(`/logout/`, {
        refresh_token,
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
      localStorage.clear();
      window.location = "/";
    } catch (err) {
      if (err.response === undefined) {
        toast.error("Internal server error.", {
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
  };
  
  render() {
    return (
      <React.Fragment>
        <div className="col-12 col-md-12 col-lg-4 col-xl-4 text-center miliods">
            <div className="d-block border rounded mfliud-bot">
                <div className="dashboard_author px-2 py-5">
                    <div className="dash_auth_thumb circle p-1 border d-inline-flex mx-auto mb-2">
                        <img src="assets/img/hari_bahadur.jpg" className="img-fluid circle" width="100" alt="" />
                    </div>
                    <div className="dash_caption">
                        <h4 className="fs-md ft-medium mb-0 lh-1">raghib islam</h4>
                        <span className="text-muted smalls">Nepal</span>
                    </div>
                </div>
                
                <div className="dashboard_author">
                    <h4 className="px-3 py-2 mb-0 lh-2 gray fs-sm ft-medium text-muted text-uppercase text-left">Dashboard Navigation</h4>
                    <ul className="dahs_navbar">
                        <li><NavLink to="/my-orders" activeclassname="active"><i className="lni lni-shopping-basket mr-2"></i>My Order</NavLink></li>
                        <li><NavLink to="/wishlist" activeclassname="active"><i className="lni lni-heart mr-2"></i>Wishlist</NavLink></li>
                        <li><NavLink to="/profile" activeclassname="active"><i className="lni lni-user mr-2"></i>Profile Info</NavLink></li>
                        <li><NavLink to="/addresses" activeclassname="active"><i className="lni lni-map-marker mr-2"></i>Addresses</NavLink></li>
                        {/* <li><NavLink to="/payment-methods" activeclassname="active"><i className="lni lni-mastercard mr-2"></i>Payment Methode</NavLink></li> */}
                        <li><Link onClick={this.handleLogout.bind(this)}><i className="lni lni-power-switch mr-2"></i>Log Out</Link></li>
                    </ul>
                </div>
                
            </div>
        </div>
      </React.Fragment>
    )
  }
}
