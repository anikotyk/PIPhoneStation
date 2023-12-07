import {useAuth0} from "@auth0/auth0-react";
import {format} from "date-fns";
import {useState} from "react";
import {getAllClientActiveServices, getAllServices, getClient, removeServiceFromClient} from "../DBRequests";
import Service from "../Service";

function GetServicesList(allServices, client, handleUnsubscribe){
    if(allServices == null)
        return;
    const listServices = allServices.map((service, index) =>{
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
                        <button type="button" className="btn btn-danger" onClick={handleUnsubscribe(client.id, service.id, index)}>Unsubscribe</button>

                    </div>
                </li>;

                return elem;
            }
        }
    );

    return listServices;
}

const UserPage = ({client})=>{
    const {user} = useAuth0();
    let [allServices, setAllServices] = useState(null);
    let [username, setUsername] = useState("")

    let handleUnsubscribe = (clientId, serviceId, index, e) => {
        let res = removeServiceFromClient(clientId, serviceId);
        if(res == null)
            return;

        const newAllServices = allServices.filter((_, i) => i !== index);
        setAllServices(newAllServices)
    };

    if(allServices==null){
        getAllClientActiveServices(client.id).then(r=>{
            let services = r;
            let servicesArray = [];
            for(let i = 0; i < services.length; i++){
                servicesArray.push(Service.from(services[i]));
            }
            servicesArray.sort((a, b) =>  b.id - a.id);
            setAllServices(servicesArray);
        });
    }

    const listServices = GetServicesList(allServices, client, handleUnsubscribe);

    return (
        <div>
            <h3><center>User Page</center></h3>
            <div className="d-flex flex-user">
                <div className="align-self-start col-lg-1 card-body text-center shadow-sm p-3 mb-5 bg-white rounded">
                    <img src={user.picture} alt="avatar"
                         className="rounded-circle img-fluid img-profile"/>
                    <h5 className="my-3">{client.username}</h5>
                    <p className="text-muted mb-1">{client.email}</p>
                    <p className="text-muted mb-1"> {client.phonenumber.toString()}</p>
                    <p className="text-muted mb-1">{format(client.lastVisitDate, 'dd.MM.yyyy').toString()}</p>
                    <ul className="list-group list-group-light ul-clients shadow-sm p-3 mb-5 bg-white rounded">
                        {listServices}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserPage;