import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

import "./index.css";
import { Dashboard } from "./routes/dashboard";
import Filter from "./components/filter/filter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {   path: "/",
            element: <Filter />,
          },
          {   path: "/",
            element: <Dashboard />,
          },
         
        ],
      },
      
    ],
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);