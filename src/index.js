import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';

import { EventType, PublicClientApplication } from "@azure/msal-browser";

// configuration option:
const pca = new PublicClientApplication({
    auth: {
        clientId: '2b168d96-e699-449e-9b81-705aa686885f',
        authority: 'https://login.microsoftonline.com/322e72b4-4ff2-4fb2-b0df-20c89e00c32a',
        redirectUri: '/',
        postLogoutRedirectUri:'/',
        clientCapabilities:['CP1']
    },
    cache:{
        cacheLocation:'localStorage',
        storeAuthStateInCookie:false,
    },
    system:{
        loggerOptions:{
            loggerCallback:(level,message,containsPII)=>{
                console.log(message)
            },
            logLevel:"Info",
        }
    }
});



// setting an event for getting current sign in user and tokens
pca.addEventCallback(event =>{
    if(event.eventType === EventType.LOGIN_SUCCESS){
        // console.log(event);
        pca.setActiveAccount(event.payload.account)
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca}/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
