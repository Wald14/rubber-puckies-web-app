import Cookie from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

// Create the context itself
const AppContext = createContext({})

// Create a React hook that will allow other components to use the context 
export const useAppCtx = () => useContext(AppContext)

export default function AppProvider(props){

  const [ user, setUser ] = useState({})

  async function verifyUser(){
    const cookie = Cookie.get("auth-cookie")


    //-----------------------------------------------------------------------------
    // Currently needs you to add the pages that the user can access without login
    // Should be refactored to only block certain pages
    // 01/09/24 This was refactored, saving old code for now
    //-----------------------------------------------------------------------------
    // if(!cookie && window.location.pathname !== "/" && !window.location.pathname.includes("/auth") && !window.location.pathname.includes("/roster") && !window.location.pathname.includes("/teamhistory")){
    //   window.location.href = "/auth"
    // }

    if(!cookie && window.location.pathname.includes("/admintools")) {
      window.location.href = "/auth"
    }
    
    try {
      const query = await fetch("/api/user/verify")
      const response = await query.json()
      if( response.result === "success" ){
        setUser(response.payload)
      }
    } catch(err){
      if( 
        // window.location.pathname !== "" && 
        !window.location.pathname.includes("/auth")) {
        window.location.href = "/auth"
      }
    }
  }

  useEffect(() => {
    verifyUser()
  },[])


  return (
    <AppContext.Provider value={{ user, verifyUser }}>
      { props.children }
    </AppContext.Provider>
  )
}