/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import avatar from "assets/img/avatar.png";

import { lazy } from "react";

const Dashboard = lazy(() => import("views/dashbord"));
const UserAccounts = lazy(() => import("views/userManagement/UserAccounts"));
const SystemPermissions = lazy(() =>
  import("views/userManagement/SystemPermissions/SystemPermissionsRoot.jsx")
);
const UserProfileMgt = lazy(() => import("views/userProfiles/userProfileMgt"));
const PositionManagementRoot = lazy(() =>
  import("views/userManagement/UserPermissions/PositionManagementRoot.jsx")
);

const routes = [
  {
    type: "collapse",
    name: "ADMIN",
    key: "my-profile",
    noCollapse: true,
    icon: <MDAvatar src={avatar} alt="User" size="sm" />,
    route: "/my-profile",
    component: <UserProfileMgt />,
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    icon: <Icon fontSize="medium">dashboard</Icon>,
    noCollapse: true,
  },
  // { type: "divider", key: "affairs-divider-1", module: "USER_MANAGEMENT" },
  // { type: "title", title: "User Management", key: "user-management", module: "USER_MANAGEMENT" },
  // { type: "divider", key: "affairs-divider-2", module: "USER_MANAGEMENT" },

  // System Config
  {
    type: "divider",
    key: "affairs-divider-3",
    //  module: "SYSTEM_CONFIG"
  },
  {
    type: "title",
    title: "Systems Configs",
    key: "systems-configs",
    // module: "SYSTEM_CONFIG"
  },
  {
    type: "divider",
    key: "affairs-divider-4",
    // module: "SYSTEM_CONFIG"
  },
  {
    type: "collapse",
    name: "User Accounts",
    key: "user-accounts",
    route: "/user-accounts",
    component: <UserAccounts />,
    icon: <Icon fontSize="medium">people</Icon>,
    noCollapse: true,
    // process: "USER_ACCOUNTS",
  },
  {
    type: "collapse",
    name: "Position Mgt",
    key: "position-management",
    route: "/position-management",
    icon: <Icon fontSize="medium">verified_user</Icon>,
    component: <PositionManagementRoot />,
    noCollapse: true,
    // process: "POSITIONS_MANAGEMENT",
  },
  {
    type: "collapse",
    name: "System Permissions",
    key: "system-permissions",
    route: "/system-permissions",
    component: <SystemPermissions />,
    icon: <Icon fontSize="medium">assignment_ind</Icon>,
    noCollapse: true,
    // process: "SYSTEM_PERMISSIONS",
  },
];

export default routes;
