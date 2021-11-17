import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../Components/Common/UserInfo/UserProfile";
import Path from "../Constant/RouterConstant";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Dashboard from "../Pages/Dashboard";
import OrderManagement from "../Pages/OrderManagement";
import ProductManagement from "../Pages/ProductManagement";
import AllItems from "../Pages/ProductManagement/Allitems/AllItems";
import Categories from "../Pages/ProductManagement/Categories/Categories";
import Tags from "../Pages/ProductManagement/Tags/Tags";
import UserManagement from "../Pages/UserManagement";
import Chef from "../Pages/UserManagement/Chef/Chef";
import Customer from "../Pages/UserManagement/Customer/Customer";

function PrivateRoute() {
  return (
    <Routes>
      <Route path={Path.dashboard} element={<DefaultLayout />}>
        <Route path={""} element={<Dashboard />} />
        
        <Route path={Path.userManagement} element={<UserManagement />} />
        <Route path={Path.chef} element={<Chef />} />
        <Route path={Path.customer} element={<Customer />} />

        <Route path={Path.productManagement} element={<ProductManagement />} />
        <Route path={Path.allItems} element={<AllItems />} />
        <Route path={Path.categories} element={<Categories />} />
        <Route path={Path.tags} element={<Tags />} />

        <Route path={Path.orderManagement} element={<OrderManagement />} />
        <Route path={Path.userProfile} element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default PrivateRoute;
