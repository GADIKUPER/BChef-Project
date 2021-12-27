import React,{useState} from 'react'

const BchefContext = React.createContext({})

//Saving the user data connected by GlobalContext
function BchefProvider({children}){

    const [user,setUser]=useState(null)

    const value = {user,setUser}
    return <BchefContext.Provider value={value}>{children}</BchefContext.Provider>
}
export {BchefProvider,BchefContext}