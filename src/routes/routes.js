const routes = [
  {
    layout: "AuthLayout",
    path: "/auth",
    isSecure: false,
    childrens: [
      {
        screen: "Login",
        childPath: "/login",
      }
    ],
  },
  {
    layout: "MainLayout",
    path: "/main",
    isSecure: false,
    childrens: [
      {
        screen: "Dashboard",
        childPath: "/dashboard",
        permissionKey:"Dashboard"
      },
      {
        screen: "Replications",
        childPath: "/replications",
        permissionKey:"Dashboard"
      },
      {
        screen: "Alerts",
        childPath: "/alerts",
        permissionKey:"Dashboard"
      },
      {
        screen: "Logs",
        childPath: "/logs",
        permissionKey:"Dashboard"
      },
      {
        screen: "Documents",
        childPath: "/documents",
        permissionKey:"Dashboard"
      },
      {
        screen: "Reports",
        childPath: "/reports",
        permissionKey:"Dashboard"
      },
      {
        screen: "AddReplication",
        childPath: "/add-replication",
        permissionKey:"Dashboard"
      },
    ],
  },
  {
    init: "/main/dashboard",
    path: "/",
  },
  {
    init: "/",
    path: "/auth",
  },
  {
    init: "/main/dashboard",
    path: "/main",
  },
  {
    component: "Page404",
    path: "*",
  },
  {
    component: "NoPermission",
    path: "/no-permission",
  },
];

export default routes;
