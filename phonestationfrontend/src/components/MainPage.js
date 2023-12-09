import React, { useState, useEffect } from "react";
import {addService, getAllServices, getClient, isAdmin, deleteService, editService} from "../DBRequests";
import LoadingComponent from "./LoadingComponent";
import Service from "../Service";
import './MainPage.css';
import PaymentPage from "./PaymentPage";
import {useAuth0} from "@auth0/auth0-react";

function GetServicesList(allServices, handleBuyClick, disabled, isAdmin, handleDeleteClick, handleSaveClick, handleDiscardClick, handleEdit) {
    const listServices = allServices.map(service => {
        if (!service.isDeleted) {
           let elem = (
                <div id={service.id} className="service-box" style={{display: "block"}}>
                    <div className="service-content">
                        <div className="service-title fw-bold">
                            {service.isTariff ? "Tariff: " : "Service: "}<text id="serviceName" contentEditable={isAdmin} onInput={handleEdit}> {service.name}</text>
                        </div>
                        <div id="serviceDescription" className="service-description text-muted" contentEditable={isAdmin} onInput={handleEdit}>{service.description}</div>
                        <div className="price-buy-container">
                            <div className="service-price text-muted"><b>Price:</b> <text id="servicePrice" contentEditable={isAdmin} onInput={handleEdit}>{service.price.toString()}</text></div>
                            {!isAdmin && !disabled && <button className="buy-button" onClick={() => handleBuyClick(service)} disabled={disabled}>Buy</button>}
                        </div>
                        {isAdmin && <div className="delete-button-div">
                            <button className="delete-button" onClick={(event) => handleDeleteClick(event, service.id)}>Delete</button>
                        </div>}
                        {isAdmin && <div id="adminBtns" className="delete-button-div" style={{display: "none"}}>
                            <button id="discardAdminBtn" className="buy-button" onClick={(event) =>handleDiscardClick(event, service)}>Discard</button>
                            <button id="saveAdminBtn" className="discard-button" onClick={(event) =>handleSaveClick(event, service)}>Save</button>
                        </div>}
                    </div>
                </div>
            );

            return elem;
        }
    });

    return <div className="services-grid">{listServices}</div>;
}

const MainPage = ({setContent}) => {
    const { user, isAuthenticated} = useAuth0();
    let [allServices, setAllServices] = useState(null);
    let [clientInfo, setClientInfo] = useState(null);
    let [filteredServices, setFilteredServices] = useState([]);
    let [isTariffSort, setIsTariffSort] = useState("all");
    let [priceRange, setPriceRange] = useState("all");
    let [userAdminData, setIsUserAdmin] = useState("unloaded");
    let [requireUpdate, setRequireUpdate] = useState("all");

    let isUserAdmin = userAdminData === "unloaded" ? false : userAdminData;

    if(isAuthenticated){
        let email = user.email;
        if(userAdminData==="unloaded"){
            isAdmin(email).then(r =>{
                setIsUserAdmin(r);
            });
        }else if(userAdminData !== "unloaded" && !isUserAdmin && clientInfo == null){
            getClient(email).then(r=>{
                setClientInfo(r)
            })
        }
    }

    const handleBuyClick = (service) => {
        setContent(<PaymentPage setContent={setContent} selectedService={service} client={clientInfo}/>);
    };

    const handleDeleteClick = (event, serviceId) => {
        deleteService(serviceId).then(r => {
            refreshServices();
        });

        setTimeout(function() {
            alert('Service deleted successfully');
        }, 1);
    };

    const handleSaveClick = (event, service) => {
        const parentDiv = event.target.closest('.service-box');
        if (parentDiv) {
            let intNum = parentDiv.querySelector('#servicePrice').textContent.replace(/\D/g, '').trim();
            intNum = parseInt(intNum);
            if(isNaN(intNum) || intNum <= 0) {
                alert("Price is incorrect");
                return;
            }

            let serviceName = parentDiv.querySelector('#serviceName').textContent.trim();
            if(serviceName.length <= 0) {
                alert("Service name can't be empty");
                return;
            }

            let serviceDescription = parentDiv.querySelector('#serviceDescription').textContent.trim();
            if(serviceDescription.length <= 0) {
                alert("Service description can't be empty");
                return;
            }

            parentDiv.querySelector('#adminBtns').style.display = "none";

            editService(service.id, intNum, serviceName, serviceDescription, service.isTariff).then(r => {
                refreshServices();
            });

            setTimeout(function() {
                alert('Service edited successfully');
            }, 1);
        }
    };

    const handleDiscardClick = (event, service) => {
        const parentDiv = event.target.closest('.service-box');
        if (parentDiv) {
            parentDiv.querySelector('#adminBtns').style.display = "none";

            parentDiv.querySelector('#serviceName').innerText = service.name;
            parentDiv.querySelector('#serviceDescription').innerText = service.description;
            parentDiv.querySelector('#servicePrice').innerText = service.price.toString();
        }
    };

    const handleEdit = (event) => {
        const parentDiv = event.target.closest('.service-box');
        if (parentDiv) {
            parentDiv.querySelector('#adminBtns').style.display = "flex";

            let intNum = parentDiv.querySelector('#servicePrice').textContent.replace(/\D/g, '');
            intNum = parseInt(intNum);
            if(isNaN(intNum)) {intNum = 0;}
            parentDiv.querySelector('#servicePrice').textContent = intNum;
        }
    };

    const refreshServices = () => {
        getAllServices().then(r => {
            let services = r;
            let servicesArray = [];
            for (let i = 0; i < services.length; i++) {
                servicesArray.push(Service.from(services[i]));
            }
            servicesArray.sort((a, b) => b.id - a.id);
            setAllServices(servicesArray);
            setRequireUpdate(true);
        });
    };

    if(allServices == null){
        refreshServices();
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
    }, [allServices, isTariffSort, priceRange, requireUpdate]);

    if (allServices == null) return <LoadingComponent />
    if (isAuthenticated && (isUserAdmin == null || clientInfo == null)) return <LoadingComponent/>

    const listServices = GetServicesList(filteredServices, handleBuyClick, setContent === undefined, isUserAdmin, handleDeleteClick, handleSaveClick, handleDiscardClick, handleEdit);

    return (
        <div className="services-page-container">
            <header className="page-header">
                <h3>Services</h3>
            </header>
            <div className="content-container">
                <div className="sidebar">
                    <div className="list-group list-group-light sidebar shadow-sm p-3 mb-5 bg-white rounded">
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

export default MainPage;