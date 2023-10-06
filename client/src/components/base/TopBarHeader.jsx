import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TopBarHeader extends Component {
  render() {
    return (
      <React.Fragment>
			<div className="py-2" style={{backgroundColor: "#eee"}}>
				<div className="container">
					<div className="row">
						
						<div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 hide-ipad">
							<div className="top_first"><Link to="callto:(+977)056-582002" className="medium text-dark">(+977)056-582002</Link></div>
						</div>
						
						<div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 hide-ipad">
							<div className="top_second text-center"><p className="medium text-dark m-0 p-0">Get Free delivery from Rs.1000 <Link to="/shop" className="medium text-dark text-underline">Shop Now</Link></p></div>
						</div>
						
						<div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">

							{/* <div className="currency-selector dropdown js-dropdown float-right">
								<Link to="#" data-toggle="dropdown" className="popup-title"  title="Currency" aria-label="Currency dropdown">
									<span className="hidden-xl-down medium text-dark">Currency:</span>
									<span className="iso_code medium text-dark">Rs.USD</span>
									<i className="fa fa-angle-down medium text-dark"></i>
								</Link>
								<ul className="popup-content dropdown-menu">  
									<li><Link title="Euro" to="#" className="dropdown-item medium text-medium">EUR €</Link></li>
									<li className="current"><Link title="US Dollar" to="#" className="dropdown-item medium text-medium">USD Rs.</Link></li>
								</ul>
							</div>
						
							<div className="language-selector-wrapper dropdown js-dropdown float-right mr-3">
								<Link className="popup-title" to="javascript:void(0)" data-toggle="dropdown" title="Language" aria-label="Language dropdown">
									<span className="hidden-xl-down medium text-dark">Language:</span>
									<span className="iso_code medium text-dark">English</span>
									<i className="fa fa-angle-down medium text-dark"></i>
								</Link>
								<ul className="dropdown-menu popup-content link">
									<li className="current"><Link to="#" className="dropdown-item medium text-medium"><img src="/assets/img/1.jpg" alt="en" width="16" height="11" /><span>English</span></Link></li>
									<li><Link to="#" className="dropdown-item medium text-medium"><img src="/assets/img/2.jpg" alt="fr" width="16" height="11" /><span>Français</span></Link></li>
									<li><Link to="#" className="dropdown-item medium text-medium"><img src="/assets/img/3.jpg" alt="de" width="16" height="11" /><span>Deutsch</span></Link></li>
									<li><Link to="#" className="dropdown-item medium text-medium"><img src="/assets/img/4.jpg" alt="it" width="16" height="11" /><span>Italiano</span></Link></li>
									<li><Link to="#" className="dropdown-item medium text-medium"><img src="/assets/img/5.jpg" alt="es" width="16" height="11" /><span>Español</span></Link></li>
									<li ><Link to="#" className="dropdown-item medium text-medium"><img src="/assets/img/6.jpg" alt="ar" width="16" height="11" /><span>اللغة العربية</span></Link></li>
								</ul>
							</div> */}
							
							<div className="currency-selector dropdown js-dropdown float-right mr-3">
								<Link to="/wishlist" className="text-dark medium">Wishlist</Link>
							</div>
							
							<div className="currency-selector dropdown js-dropdown float-right mr-3">
								<Link to="/my-orders" className="text-dark medium">My Account</Link>
							</div>
							
						</div>
						
					</div>
				</div>
			</div>
      </React.Fragment>
    )
  }
}
