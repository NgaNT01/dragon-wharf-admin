import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// Auth Imports
import Reports from "./views/admin/Reports";
import UserTable from "./views/admin/User/components/UserTable";
import User from "./views/admin/User";
import UserDetails from "./views/admin/User/components/UserDetails";

const routes = [
  {
    name: "Bảng điều khiển",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Reports",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/reports",
    component: Reports,
  },
  {
    name: "Tour",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/tours",
    component: DataTables,
  },
  {
    name: "User",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/users",
    component: User,
  },
  {
    layout: "/admin",
    path: "/users/:userId",
    component: UserDetails,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    layout: "/auth",
    path: "/sign-in",
  },
];

export default routes;
