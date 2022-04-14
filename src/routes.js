import React from "react";

// Layout Types
import { defaultLayout, authLayout } from "./layouts";

// Route Views
import HomePage from "./components/Homepage";
import Requestapprove from "./components/Requestapprove";
import Marketplace from "./components/Marketplace";
import Dashboard from "./components/Dashboard";
import CreateAssets from "./components/CreateAssets";

export const publicRoutes = [
  {
    path: "/home",
    exact: true,
    layout: authLayout,
    component: HomePage,
  },
  {
    path: "/",
    exact: true,
    layout: authLayout,
    component: () => <HomePage />,
  },
  {
    path: "/request-approve",
    layout: authLayout,
    component: () => <Requestapprove />,
  },
  {
    path: "/dashboard",
    layout: defaultLayout,
    component: () => <Dashboard />,
  },
  {
    path: "/marketplace",
    layout: defaultLayout,
    component: () => <Marketplace />,
  },
  {
    path: "/create-assets",
    layout: defaultLayout,
    component: () => <CreateAssets />,
  }
];

export const privateRoutes = [
 
];
