import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Path from '../Constant/RouterConstant'
import DefaultLayout from '../Layout/DefaultLayout/DefaultLayout'
import Dashboard from '../Pages/Dashboard'
import OrderManagement from '../Pages/OrderManagement'
import ProductManagement from '../Pages/ProductManagement'
import UserManagement from '../Pages/UserManagement'

function PrivateRoute() {
    return (
        <Routes>
            <Route path={Path.dashboard} element={<DefaultLayout />} >
                <Route path={Path.orderManagement} element={<OrderManagement />} />
                <Route path={Path.productManagement} element={<ProductManagement />} />
                <Route path={Path.userManagement} element={<UserManagement />} />
                <Route path={''} element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default PrivateRoute
