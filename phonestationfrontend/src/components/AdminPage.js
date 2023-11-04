import LoadingComponent from "./LoadingComponent";
import {useState} from "react";
import {getAllClients} from "../DBRequests";
import {format} from "date-fns";
import Client from "../Client";

function GetUsersList(allClients){
    const listUsers = allClients.map(client =>{
            let elem = <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <div className="d-flex flex-client-info">
                            <div className="fw-bold">{client.username}</div>

                        </div>
                        <div className="text-muted">{client.email}</div>
                        <div className="text-muted">{client.phonenumber.toString()}</div>
                        <div className="text-muted">{format(client.lastVisitDate, 'dd.MM.yyyy').toString()}</div>
                    </div>
                </div>
            </li>;

            return elem;
        }
    );

    return listUsers;
}

const AdminPage = ()=>{
    let [allClients, setAllClients] = useState(null);

    if(allClients==null){
        getAllClients().then(r=>{
            let clients = r;
            let clientsArray = [];
            for(let i = 0; i < clients.length; i++){
                clientsArray.push(Client.from(clients[i]));
            }
            clientsArray.sort((a, b) =>  b.id - a.id);
            setAllClients(clientsArray);
        });
    }

    if(allClients==null) return <LoadingComponent/>

    const listUsers = GetUsersList(allClients);

    return (
        <div>
            <h3><center>Admin Page</center></h3>
            <h3><center>Clients</center></h3>
            <ul className="list-group list-group-light ul-clients shadow-sm p-3 mb-5 bg-white rounded">
                {listUsers}
            </ul>
        </div>
    )
}

export default AdminPage;