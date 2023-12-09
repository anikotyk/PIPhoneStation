import './App.css';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import PageContent from "./components/PageContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingComponent from "./components/LoadingComponent";
import {useState} from "react";
import MainPageButton from "./components/MainPageButton";
import UserPageButton from "./components/UserPageButton";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ServicesPage from './components/ServicesPage';
import PaymentPage from './components/PaymentPage';

function App() {
    return (<Router>
        <Routes>
            <Route path="/payment" element={<PaymentPage/>}/>
            <Route path="/services" element={<ServicesPage/>}/>
        </Routes>
    </Router>);


    // const { user, isAuthenticated , isLoading} = useAuth0();
    // let [pageContent, setPageContent] = useState(<PageContent />);

    // if(isLoading) return <LoadingComponent/>

    // return (
    //   <div id = "app">
    //       <div id="appContent">
    //           <div id = "logButton" >
    //               <div className={"d-flex"}>
    //                   <UserPageButton setContent={setPageContent}/>
    //                   <MainPageButton setContent={setPageContent}/>
    //               </div>
    //               <LoginButton />
    //               <LogoutButton />
    //           </div>
    //           <div id="pageContent">
    //               {pageContent}
    //           </div>
    //       </div>
    //   </div>
    // );
}

export default App;
