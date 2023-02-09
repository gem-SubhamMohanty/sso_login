import Grid from "@mui/material/Grid";
import { PageLayout } from "./components/PageLayout";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react"; // This basically lets gateway to every component that needs to be authenticated through msal authentication state
import { useEffect } from "react";


function App({msalInstance}) {
    return (
        <MsalProvider instance={msalInstance}>
            <PageLayout>
                <Grid container justifyContent="center">
                    <Pages />
                </Grid>
            </PageLayout>
        </MsalProvider>
    );
}

const Pages = () => {
    const {instance} = useMsal();
    const isAuthenticated = useIsAuthenticated();

    // it checks if user is loggid in and redirects to the page as it uses session storage to maintain session
    useEffect(()=>{
        if(!isAuthenticated){
            instance.ssoSilent({
                scopes:["user.read"],
                loginHint:""
            }).then((response)=>{
                instance.setActiveAccount(response.account);
            }).catch((error)=>{
                if(error instanceof InteractionRequiredAuthError){
                    instance.loginRedirect({
                        scopes:["user.read"],
                    })
                }
            })
        }
    },[])
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;
