import React from 'react'

export default function Logout() {
    const LogoutUser = () =>{
        sessionStorage.clear()
        window.location.replace('/')
    }
    return (
        <React.Fragment>
            {LogoutUser()}
        </React.Fragment>
    )
}
