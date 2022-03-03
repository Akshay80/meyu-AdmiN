import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../Components/Common/UserInfo/UserProfile";
import Path from "../Constant/RouterConstant";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Dashboard from "../Pages/Dashboard";
import Customer from "../Pages/UserManagement/Customer/Customer";
import CustomerDetail from "../Pages/UserManagement/Customer/CustomerDetail";
import Chef from "../Pages/UserManagement/Chef/Chef";
import ChefDetail from "../Pages/UserManagement/Chef/ChefDetail";
import AllItems from "../Pages/ProductManagement/Allitems/AllItems";
import Categories from "../Pages/ProductManagement/Categories/Categories";
import Tags from "../Pages/ProductManagement/Tags/Tags";
import Ingredients from "../Pages/ProductManagement/Ingredients/Ingredients";
import OrderManagement from "../Pages/OrderManagement";
import OrderProfile from "../Pages/OrderManagement/OrderProfile/OrderProfile";
import EditItems from "../Pages/ProductManagement/Allitems/EditItems";
import ChangePassword from "../Components/Auth/ChangePassword/ChangePassword";
import TaxTable from "../Components/Common/Table/TaxTable/TaxTable";
import DiscountTable from "../Components/Common/Table/DiscountTable/DiscountTable";

function PrivateRoutes() {
  return (
    <Routes>
      <Route path={Path.dashboard} element={<DefaultLayout />}>
        <Route path={Path.changePassword} element={<ChangePassword />} />
        <Route path={""} element={<Dashboard />} />
        <Route path={Path.customer} element={<Customer />} />
        <Route
          path={`${Path.customerDetails}/:customerId`}
          element={<CustomerDetail />}
        />
        <Route path={`${Path.chefDetails}/:chefId`} element={<ChefDetail />} />
        <Route path={Path.chef} element={<Chef />} />
        <Route path={Path.allItems} element={<AllItems />} />
        <Route path={`${Path.editItems}/:itemId`} element={<EditItems />} />
        <Route path={Path.categories} element={<Categories />} />
        <Route path={Path.tags} element={<Tags />} />
        <Route path={Path.tax} element={<TaxTable />} />
        <Route path={Path.discount} element={<DiscountTable />} />
        <Route path={Path.ingredients} element={<Ingredients />} />
        <Route path={Path.orderManagement} element={<OrderManagement />} />
        <Route path={`${Path.orderDetails}/:orderId`} element={<OrderProfile />} />
        <Route path={Path.userProfile} element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default PrivateRoutes;
