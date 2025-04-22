import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { Sidebar } from "../components/sidebar/sidebar";

export default function Root() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main>
        <Outlet />
      </main>
    </>
  );
}
