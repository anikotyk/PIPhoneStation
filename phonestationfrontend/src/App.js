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
import {getClient, isAdmin} from "./DBRequests";

function App() {
    const { user, isAuthenticated , isLoading} = useAuth0();
    let [pageContent, setPageContent] = useState(<PageContent/>);
    let [isUserAdmin, setIsUserAdmin] = useState(null);
    let [clientInfo, setClientInfo] = useState(null);

    if(isLoading) return <LoadingComponent/>

    if(isAuthenticated){
        let email = user.email;

        if(isUserAdmin==null){
            isAdmin(email).then(r =>{
                setIsUserAdmin(r);
            });

            return <LoadingComponent/>
        }else if(!isUserAdmin && clientInfo == null){
            getClient(email).then(r=>{
                setClientInfo(r)
            })
            
            return <LoadingComponent/>
        }
    }

    return (
      <div id = "app">
          <h1 className={"text-center p-2"}>Na Zvyazku</h1>
          <div id="appContent">
              <div id = "logButton" >
                  <div className={"d-flex"}>
                      <UserPageButton setContent={setPageContent}/>
                      <MainPageButton setContent={setPageContent}/>
                  </div>
                  <LoginButton />
                  <LogoutButton />
              </div>
              <div id="pageContent">
                  {pageContent}
              </div>
          </div>
      </div>
    );
}

export default App;
