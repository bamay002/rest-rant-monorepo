import { createContext, useState, useEffect } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedUser = async () => {
            let response = await fetch('http://localhost:3500/authentication/profile' , {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.ok){
                let user = await response.json()
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        }
        getLoggedUser()
    })

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider