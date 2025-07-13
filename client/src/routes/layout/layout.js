import Navbar from "../../components/Navbar";
import "./layout.scss";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Navbar/>
      </div>

    <div className="layout">
      <Outlet />
    </div>

    <div className="layout">
      <Outlet />
    </div>
    
    </>
  );
};

export default Layout;
