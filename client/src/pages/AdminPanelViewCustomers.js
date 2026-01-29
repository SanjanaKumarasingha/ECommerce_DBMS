import { useState } from "react";
import AdminPanelHeader from "../pageComponents/AdminPanelComponents/AdminPanelHeader";
import AdminPanelSideBar from "../pageComponents/AdminPanelComponents/AdminPanelSideBar";
import APViewCustomers from "../pageComponents/AdminPanelComponents/APViewCustomers";
import "../App.css";

function AdminPanelViewCustomers() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <AdminPanelHeader OpenSidebar={OpenSidebar} />
      <div className="grid-container">
        <AdminPanelSideBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <APViewCustomers />
      </div>
    </div>
  );
}

export default AdminPanelViewCustomers;
