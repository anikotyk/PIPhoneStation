import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {getClient, isAdmin} from "../DBRequests";
import LoadingComponent from "./LoadingComponent";
import MainPage from "./MainPage";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

const PageContent = ()=>{
    const { user, isAuthenticated} = useAuth0();
    let [isUserAdmin, setIsUserAdmin] = useState(null);
    let [clientInfo, setClientInfo] = useState(null);

    if(!isAuthenticated) return <MainPage/>

    let email = user.email;

    if(isUserAdmin==null){
        isAdmin(email).then(r =>{
            setIsUserAdmin(r);
        });
    }else if(!isUserAdmin && clientInfo == null){
        getClient(email).then(r=>{
            setClientInfo(r)
        })
    }

    if(isUserAdmin == null) return <LoadingComponent/>

    if(isUserAdmin) return <AdminPage/>

    if(clientInfo == null) return <LoadingComponent/>

    return <UserPage client={clientInfo}/>
}

export default PageContent;