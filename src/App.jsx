import React, {useEffect, useState} from "react";
import './App.css';
import {AppRouter} from "./app/router/AppRouter";
import {AuthContext,initAuthContext} from "./app/context/AuthContext";
import httpService from "./app/service/HttpService";
import {SnackbarProvider} from "notistack";


function App() {

    const [authDto, setAuthDto] = useState(initAuthContext);

    const auth = {
        token: sessionStorage.getItem('accessToken') || '',
        username: sessionStorage.getItem('username') || '',
        isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')) || false
    };
    httpService.configure(auth, setAuthDto, window);

    useEffect(async () => {
        setAuthDto(auth);
    }, []);

    return (
        // <React.StrictMode>
            <div className="app">
                <SnackbarProvider autoHideDuration={2500} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <AuthContext.Provider value={{authDto, setAuthDto}}>
                        <AppRouter/>
                    </AuthContext.Provider>
                </SnackbarProvider>
            </div>
        // </React.StrictMode>
    );
}

export default App;
