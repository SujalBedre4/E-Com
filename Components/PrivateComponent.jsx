import React from "react"
import { Navigate, Outlet } from "react-router-dom"

function PrivateComonent() {
    return (<>
        <Outlet />
    </>)
}

export default PrivateComonent