import React from "react";
import { ReactComponent as DashboardIcon } from "../../Assets/Icon/home.svg";
import { ReactComponent as UserIcon } from "../../Assets/Icon/user.svg";
import { ReactComponent as ProductIcon } from "../../Assets/Icon/product.svg";
import { ReactComponent as OrderIcon } from "../../Assets/Icon/order.svg";
import Path from "../../Constant/RouterConstant";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: Path.dashboard,
  },
  {
    title: "User Management",
    icon: <UserIcon />,
    link: Path.customer,

    subMenus: [
      {
        title: "Customer",
        link: Path.customer,
      },
      {
        title: "Chef",
        link: Path.chef,
      },
    ],
  },
  {
    title: "Product Management",
    icon: <ProductIcon />,
    link: Path.allItems,
    
    subMenus: [
      {
        title: "All Items",
        link: Path.allItems,
      },
      {
        title: "Categories",
        link: Path.categories,
      },
      {
        title: "Tags",
        link: Path.tags,
      },
    ],
  },
  {
    title: "Order Management",
    icon: <OrderIcon />,
    link: Path.orderManagement,
  },
];