import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react"
import { useAppCtx } from "../utils/AppProvider"


export default function Auth({usage="signup"}){

  const appCtx = useAppCtx()

  const [ userData, setUserData ] = useState({ username: "", password: "" })

  function handleInputChange(e){
    setUserData({...userData, [e.target.name]: e.target.value })
  }

  async function handleFormSubmit(e){
    e.preventDefault()
    try {
      const query = await fetch(`/api/user/auth`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const response = await query.json()
      console.log(response)
      if( response.result === "success" ){
        window.location.href = "/admintools"
      }
    } catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    setUserData({...userData, username: appCtx.user.username || "" })
  },[appCtx])


  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <h2>Admin Login</h2>
          <div>
            <div>
              <label className="d-block">Username</label>
              <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
            </div>

            <div>
              <label className="d-block">Password</label>
              <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
            </div>
          </div>

          <button className="mt-2 btn btn-outline-warning">Login</button>
        </div>
      </form>
    </div>
  )

}