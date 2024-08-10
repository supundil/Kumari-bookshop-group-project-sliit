import {createContext} from "react";

const initAuthContext = {
    token: "",
    username: "",
    isAdmin: false,
}

const AuthContext = createContext({
    authDto: initAuthContext,
    setAuthDto: (authDto) => {},
});

export { initAuthContext, AuthContext };