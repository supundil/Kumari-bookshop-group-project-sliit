import React, {useEffect, useState} from "react";
import './App.css';
import {AppRouter} from "./app/router/AppRouter";
import {AuthContext} from "./app/context/AuthContext";
import httpService from "./app/service/HttpService";
import {SnackbarProvider} from "notistack";
import {CircularProgress} from "@material-ui/core";


function App() {

    const [authDto, setAuthDto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = {
            token: sessionStorage.getItem('accessToken') || '',
            username: sessionStorage.getItem('username') || '',
            isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')) || false,
        };

        httpService.configure(auth, window);
        setAuthDto(auth);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="app">
            <SnackbarProvider autoHideDuration={2500} anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                <AuthContext.Provider value={{authDto, setAuthDto}}>
                    <AppRouter/>
                </AuthContext.Provider>
            </SnackbarProvider>
        </div>
    );
}

export default App;
