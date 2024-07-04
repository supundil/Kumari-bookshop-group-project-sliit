import {createContext} from "react";

const initAuthContext = {
    token: null,
    username: "",
    isAdmin: false,
}

const AuthContext = createContext({
    authDto: initAuthContext,
    setAuthDto: (authDto) => {},
});

export { initAuthContext, AuthContext };