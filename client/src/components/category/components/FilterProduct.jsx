import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Slider from "react-slider";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class FilterProduct extends Component {
  constructor() {
    super();
    this.state = {
        lowestPrice: 10,
        highestPrice: 1000,
        priceRange: [10, 1000],
        categories: [],
        sizes: [],
        brands: [],
        colors: [],
    };
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handlePriceChange(minValue, maxValue) {
    this.setState({
        priceRange: [minValue, maxValue],
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let res = await axiosInstance.post(`/contact-form/`, {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
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
        name: "",
        email: "",
        subject: "",
        message: "",
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

  render() {
    let { categories, sizes, brands, colors } = this.props;

    const handleClick = event => {
        // toggle class on click
        event.currentTarget.classList.toggle('collapsed');

        const event_id = event.currentTarget.id;
        document.getElementById(event_id+'_toggle').classList.toggle('show');
    };

    return (
        <React.Fragment>
          <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 p-xl-0">
            <div className="search-sidebar sm-sidebar border">
                <div className="search-sidebar-body">
                
                    <div className="single_search_boxed">
                        <div className="widget-boxed-header px-3">
                            <h4 className="mt-3">Categories</h4>
                        </div>
                        <div className="widget-boxed-body">
                            <div className="side-list no-border">
                                <div className="filter-card" id="shop-categories">
                                    
                                    {categories?.map((category) => {
                                        return (
                                        <div className="single_filter_card">
                                            <h5><Link to="#" data-toggle="collapse" id={category.slug} className="collapsed" aria-expanded="false" role="button" onClick={handleClick}>{category.name}<i className="accordion-indicator ti-angle-down"></i></Link></h5>
                                            
                                            <div className="collapse" id={`${category.slug}_toggle`} data-parent="#shop-categories">
                                                <div className="card-body">
                                                    <div className="inner_widget_link">
                                                        <ul>
                                                            {category.subcategories?.map((subcategory) => {
                                                                return (
                                                                    <li><Link to="#">{subcategory.name}<span>100</span></Link></li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="single_search_boxed mt-3">
                        <div className="widget-boxed-header px-3">
                            <h4 className="mt-3 mb-2">Pricing</h4>
                        </div>
                        <div className="widget-boxed-body collapse show" id="pricing" data-parent="#pricing">
                            <div className="side-list no-border mb-4">
                                <div className="rg-slider">
                                        <input type="hidden" name="price_range" value={this.state.priceRange[0]+`,`+this.state.priceRange[1]} />
                                        <b>Price range:</b> Rs.{this.state.priceRange[0]} - Rs.{this.state.priceRange[1]}
                                        <Slider
                                            min={this.state.lowestPrice}
                                            max={this.state.highestPrice}
                                            defaultValue={[this.state.lowestPrice, this.state.highestPrice]}
                                            pearling
                                            minDistance={10}
                                            onAfterChange={([minValue, maxValue]) => {
                                                this.handlePriceChange(minValue, maxValue);

                                                document.querySelector(".thumb.active") &&
                                                document.querySelector(".thumb.active").blur();
                                            }}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="single_search_boxed">
                        <div className="widget-boxed-header">
                            <h4><Link to="#size" data-toggle="collapse" id="size" className="collapsed" aria-expanded="false" role="button" onClick={handleClick}>Size</Link></h4>
                        </div>
                        <div className="widget-boxed-body collapse" id="size_toggle" data-parent="#size">
                            <div className="side-list no-border">
                                <div className="single_filter_card">
                                    <div className="card-body pt-0">
                                        <div className="text-left pb-0 pt-2">

                                            {sizes?.map((size) => {
                                                return (
                                                    <div className="form-check form-option form-check-inline mb-2">
                                                        <input className="form-check-input" type="radio" name="sizes" id={size.size_code}/>
                                                        <label className="form-option-label" htmlFor={size.size_code}>{size.size_code}</label>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="single_search_boxed">
                        <div className="widget-boxed-header">
                            <h4><Link to="#brands" data-toggle="collapse" id="brands" className="collapsed" aria-expanded="false" role="button" onClick={handleClick}>Brands</Link></h4>
                        </div>
                        <div className="widget-boxed-body collapse" id="brands_toggle" data-parent="#brands">
                            <div className="side-list no-border">
                                <div className="single_filter_card">
                                    <div className="card-body pt-0">
                                        <div className="inner_widget_link">
                                            <ul className="no-ul-list">
                                                
                                                {brands?.map((brand) => {
                                                    return (
                                                        <li>
                                                            <input id={brand.name} className="checkbox-custom" name={brand.name} type="checkbox"/>
                                                            <label htmlFor={brand.name} className="checkbox-custom-label">{brand.name}</label>
                                                        </li>
                                                    );
                                                })}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="single_search_boxed">
                        <div className="widget-boxed-header">
                            <h4><Link to="#colors" data-toggle="collapse" id="colors" className="collapsed" aria-expanded="false" role="button" onClick={handleClick}>Colors</Link></h4>
                        </div>
                        <div className="widget-boxed-body collapse" id="colors_toggle" data-parent="#colors">
                            <div className="side-list no-border">
                                <div className="single_filter_card">
                                    <div className="card-body pt-0">
                                        <div className="text-left">
                                            
                                            {colors?.map((color) => {
                                                return (
                                                    <div className="form-check form-option form-check-inline mb-1">
                                                        <input className="form-check-input" type="radio" name={color.color_code} id={color.color_code} />
                                                        <label className="form-option-label rounded-circle" htmlFor={color.color_code}><span className="form-option-color rounded-circle" style={{ background: "#" + color?.color_code }}></span></label>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        </React.Fragment>
    )
  }
}
