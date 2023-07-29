import { createContext, useState, useEffect } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch('http://localhost:3500/authentication/profile' , {
                credentials: 'include'
            })
            let user = await response.json()
            if (response.ok){
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        }
            getLoggedInUser()
    },[])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider