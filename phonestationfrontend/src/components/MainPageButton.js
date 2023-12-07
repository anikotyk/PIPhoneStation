import {useAuth0} from "@auth0/auth0-react";
import {Button} from "react-bootstrap";
import React from "react";
import MainPage from "./MainPage";

const MainPageButton = ({setContent})=>{
    return <Button className={"me-1"} onClick={()=>setContent(<MainPage/>)} variant="success"> Menu </Button>
}

export default MainPageButton;