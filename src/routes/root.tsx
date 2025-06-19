import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";

export default function Root() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header   />

  

      <main>
        <Outlet />
      </main>
    </>
  );
}
