import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllServices } from "../DBRequests";
import LoadingComponent from "./LoadingComponent";
import Service from "../Service";
import './ServicesPage.css';

function GetServicesList(allServices, handleBuyClick) {

    const listServices = allServices.map(service => {
        if (!service.isDeleted) {
            let elem = (
                <div className="service-box">
                    <div className="service-content">
                        <div className="service-title fw-bold">
                            {service.isTariff ? "Tariff: " : "Service: "} {service.name}
                        </div>
                        <div className="service-description text-muted">{service.description}</div>
                        <div className="price-buy-container">
                            <div className="service-price text-muted"><b>Price:</b> {service.price.toString()}</div>
                            <button className="buy-button" onClick={() => handleBuyClick(service)}>Buy</button>
                        </div>
                    </div>
                </div>
            );

            return elem;
        }
    });

    return <div className="services-grid">{listServices}</div>;
}



const ServicesPage = () => {
    const navigate = useNavigate();
    let [allServices, setAllServices] = useState(null);
    let [filteredServices, setFilteredServices] = useState([]);
    let [isTariffSort, setIsTariffSort] = useState("all");
    let [priceRange, setPriceRange] = useState("all");
    
    const handleBuyClick = (service) => {
        navigate('/payment', { state: { selectedService: service } });
    };

    if (allServices == null) {
        getAllServices().then(r => {
            let services = r;
            let servicesArray = [];
            for (let i = 0; i < services.length; i++) {
                servicesArray.push(Service.from(services[i]));
            }
            servicesArray.sort((a, b) => b.id - a.id);
            setAllServices(servicesArray);
        });
    }

    useEffect(() => {
        let services = allServices;

        if (allServices === null) {
            return;
        }

        if (isTariffSort === "true") {
            services = services.filter(service => service.isTariff);
        } else if (isTariffSort === "false") {
            services = services.filter(service => !service.isTariff);
        }
        if (priceRange !== "all") {
            if (priceRange === "500+") {
                services = services.filter(service => service.price >= 500);
            } else {
                const [minPrice, maxPrice] = priceRange.split('-').map(Number);
                services = services.filter(service => {
                    if (maxPrice) {
                        return service.price >= minPrice && service.price <= maxPrice;
                    }
                    return service.price >= minPrice;
                });
            }
        }

        setFilteredServices(services);
    }, [allServices, isTariffSort, priceRange]);

    if (allServices == null) return <LoadingComponent />

    const listServices = GetServicesList(filteredServices, handleBuyClick);


    return (
        <div className="services-page-container">
            <header className="page-header">
                <h3>Main Page</h3>
                <h3>Services</h3>
            </header>
            <div className="content-container">
                <div className="sidebar">
                    <div className="list-group list-group-light sidebar shadow-sm mb-5 bg-white rounded">
                        <div className="parameters-list">
                            <h6 className="group-title">Filter By Type</h6>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="isTariffSort"
                                        value="all"
                                        checked={isTariffSort === "all"}
                                        onChange={() => setIsTariffSort("all")}
                                    />
                                    All
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="isTariffSort"
                                        value="true"
                                        checked={isTariffSort === "true"}
                                        onChange={() => setIsTariffSort("true")}
                                    />
                                    Tariff Only
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="isTariffSort"
                                        value="false"
                                        checked={isTariffSort === "false"}
                                        onChange={() => setIsTariffSort("false")}
                                    />
                                    Services Only
                                </label>
                            </div>
                        </div>

                        <div className="parameters-list">
                            <h6 className="group-title">Sort by Price</h6>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="all"
                                        checked={priceRange === "all"}
                                        onChange={() => setPriceRange("all")}
                                    />
                                    All
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="0-100"
                                        checked={priceRange === "0-100"}
                                        onChange={() => setPriceRange("0-100")}
                                    />
                                    0-100
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="100-250"
                                        checked={priceRange === "100-250"}
                                        onChange={() => setPriceRange("100-250")}
                                    />
                                    100-250
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="250-500"
                                        checked={priceRange === "250-500"}
                                        onChange={() => setPriceRange("250-500")}
                                    />
                                    250-500
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="500+"
                                        checked={priceRange === "500+"}
                                        onChange={() => setPriceRange("500+")}
                                    />
                                    500+
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    <div className="list-group list-group-light services-main-box shadow-sm p-3 mb-5 bg-white rounded">
                        {listServices}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPage;