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
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider  theme={{ primaryColor: 'teal' }} >
      <ContextProvider>
        <NotificationsProvider position="top-center"  limit={1}   zIndex={99999}  >

          <QueryClientProvider client={queryClient}   >

            <RouterProvider router={router} />
            
          </QueryClientProvider>
        </NotificationsProvider>
      </ContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
