import {useAuth0} from "@auth0/auth0-react";
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import MainPage from "./MainPage";
import {getClient, isAdmin} from "../DBRequests";
import AdminPage from "./AdminPage";
import LoadingComponent from "./LoadingComponent";
import UserPage from "./UserPage";

const UserPageButton = ({setContent})=>{
    const { user, isAuthenticated} = useAuth0();
    let [isUserAdmin, setIsUserAdmin] = useState(null);
    let [clientInfo, setClientInfo] = useState(null);

    if(!isAuthenticated)
        return <div></div>;

    if(isUserAdmin == null)
    {
        isAdmin(user.email).then(r =>{
            setIsUserAdmin(r);
        });

        return <div></div>
    }else if(!isUserAdmin && clientInfo == null){
        getClient(user.email).then(r=>{
            setClientInfo(r)
        })
    }

    if(isUserAdmin == true)
        return <Button className={"me-1"} onClick={()=>setContent(<AdminPage/>)} variant="success"> Admin Menu </Button>

    if(clientInfo == null)
        return <div></div>;

    return <Button className={"me-1"} onClick={()=>setContent(<UserPage client={clientInfo}/>)} variant="success"> User Menu </Button>
}

export default UserPageButton;