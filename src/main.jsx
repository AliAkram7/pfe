import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import "./index.css";
import router from "./router";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <ContextProvider>
        <NotificationsProvider position="top-center" >

          <QueryClientProvider client={queryClient}   >

            <RouterProvider router={router} />
            
          </QueryClientProvider>
        </NotificationsProvider>
      </ContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
