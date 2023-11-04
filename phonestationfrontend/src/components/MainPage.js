import {useState} from "react";
import {getAllServices} from "../DBRequests";
import LoadingComponent from "./LoadingComponent";
import Service from "../Service";

function GetServicesList(allServices){
    const listServices = allServices.map(service =>{
        if(!service.isDeleted){
            let elem = <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="d-flex flex-client-info">
                            <div className="fw-bold">{service.isTariff ? "Tariff ": "Service " + service.name}</div>
                        </div>
                        <div className="text-muted">{service.price.toString()}</div>
                        <div className="text-muted">{service.description}</div>
                    </div>
                </div>
            </li>;

            return elem;
        }
        }
    );

    return listServices;
}


const MainPage = ()=>{
    let [allServices, setAllServices] = useState(null);

    if(allServices==null){
        getAllServices().then(r=>{
            let services = r;
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
        <div>
            <h3><center>Main Page</center></h3>
            <h3><center>Services</center></h3>
            <ul className="list-group list-group-light ul-clients shadow-sm p-3 mb-5 bg-white rounded">
                {listServices}
            </ul>
        </div>
    )
}

export default MainPage;