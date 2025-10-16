import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root from "./routes/root";
import NotFoundPage from './routes/notfound';
import ProfilePage from './routes/profile';
import AdminPanel from './routes/admin';
import AboutUs from './routes/aboutus';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
  }, 
  {
    path: '/profiles',
    element: <ProfilePage />,
    children: [
      {
        path: '/profiles/:profileId',
        element: <ProfilePage />,
      },
    ]},
    {
      path: '/aboutus',
    element: <AboutUs />},
{    path: '/admin',
    element: <AdminPanel />,
    
  },
      
    ],
);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);