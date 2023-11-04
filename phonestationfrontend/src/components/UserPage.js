import {useAuth0} from "@auth0/auth0-react";
import {format} from "date-fns";

const UserPage = ({client})=>{
    const { user} = useAuth0();
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
                </div>
            </div>
        </div>
    )
}

export default UserPage;