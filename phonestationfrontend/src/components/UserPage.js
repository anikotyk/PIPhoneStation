import {useAuth0} from "@auth0/auth0-react";
import {format} from "date-fns";
import {useState} from "react";
import {
    getAllClientActiveServices,
    getAllServices,
    getClient,
    removeServiceFromClient, setClientPhone,
    setClientUsername
} from "../DBRequests";
import Service from "../Service";
import EditableText from "./EditableText";

function GetServicesList(allServices, client, handleUnsubscribe){
    if(allServices == null)
        return;
    const listServices = allServices.map((service, index) =>{
            if(!service.isDeleted){
                let elem = <li className="list-group-item">
                    <div className="service-box">
                        <div className="service-content">
                            <div className="service-title fw-bold">
                                {service.isTariff ? "Tariff: " : "Service: "} {service.name}
                            </div>
                            <div className="service-description text-muted">{service.description}</div>
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
    let [username, setUsername] = useState(client.username)
    let [phoneNumber, setPhoneNumber] = useState(client.phonenumber.toString())

    let onUsernameChange = (newUsername) => {
        let regex = /^[a-zA-Z]+$/
        if(!regex.test(newUsername))
            return false;

        newUsername = newUsername.toLowerCase();
        newUsername[0].toUpperCase();

        setClientUsername(client.id, newUsername).then(() => {
            setUsername(newUsername)
        });

        return true;
    }

    let onPhoneNumberChange = (newPhoneNumber) => {
        let regex = /^\+380[1-9]{9}$/

        if(!regex.test(newPhoneNumber))
            return false;

        newPhoneNumber = newPhoneNumber.substring(1)

        setClientPhone(client.id, newPhoneNumber).then(() => {
            setPhoneNumber(newPhoneNumber)
        });

        return true;
    }

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
                <div className="align-self-start col-lg-1 card-body text-center shadow-sm p-3 mb-5 bg-white rounded d-flex flex-column align-items-center">
                    <img src={user.picture} alt="avatar"
                         className="rounded-circle img-fluid img-profile mb-3"/>
                    <EditableText onChange={onUsernameChange} initText={username} fieldName={"Username: "}/>
                    <EditableText onChange={onPhoneNumberChange} initText={phoneNumber} fieldName={"Phone: "}/>
                    <p className="text-muted mb-2">{client.email}</p>
                    <p className="text-muted mb-2">{format(client.lastVisitDate, 'dd.MM.yyyy').toString()}</p>
                    <ul className="list-group list-group-light ul-clients shadow-sm p-3 mb-5 bg-white rounded">
                        {listServices}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserPage;