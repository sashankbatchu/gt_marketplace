import React from "react";
import axios from "axios";
import { createContext, useState, useEffect } from "react/cjs/react.production.min";

export const UserContext = createContext({}); 

export function UserContextProvider({children}) {
    const [user, setUser] = React.useState(null); 
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data); 
            })
        }
    }, []); 
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>

    )
}