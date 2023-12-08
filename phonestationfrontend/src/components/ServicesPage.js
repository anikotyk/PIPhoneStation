import {useState} from "react";
import {getAllServices} from "../DBRequests";
import LoadingComponent from "./LoadingComponent";
import Service from "../Service";
import './ServicesPage.css';

function GetServicesList(allServices) {
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
                            <button className="buy-button">Buy</button>
                        </div>
                    </div>
                </div>
            );

            return elem;
        }
    });

    return <div className="services-grid">{listServices}</div>;
}



const ServicesPage = ()=>{
    let [allServices, setAllServices] = useState(null);

    if(allServices==null){
        getAllServices().then(r=>{
            let services = r;
            console.log(services);
            let servicesArray = [];
            for(let i = 0; i < services.length; i++){
                servicesArray.push(Service.from(services[i]));
            }
            servicesArray.sort((a, b) =>  b.id - a.id);
            setAllServices(servicesArray);
        });
    }

    if(allServices==null) return <LoadingComponent/>

    const listServices = GetServicesList(allServices);

    return (
        <div className="services-page-container">
            <h3><center>Main Page</center></h3>
            <h3><center>Services</center></h3>
            <div className="list-group list-group-light services-main-box shadow-sm p-3 mb-5 bg-white rounded">
                {listServices}
            </div>
        </div>
    )
}

export default ServicesPage;