import React, { useContext, useEffect } from "react";
import Statistics from "../../components/Statistics/statistics";
import "./speaker.css";
import { StateContext } from "../../context/Context";
import SidebarActive from "../../components/Sidebar/SidebarActive";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavbarDemo from "../../components/Navbar/Navbar";
import NavbarSm from "../../components/Navbar/NavbarSm";
import SidebarSm from "../../components/Sidebar/SidebarSm";

export default function Speaker(props) {
  const { navStretch } = useContext(StateContext);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="speaker">
      <NavbarDemo />
      <NavbarSm />
      <SidebarSm active={0} />
      <SidebarActive active={1} />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <Statistics user={props.user} />
      </div>
    </div>
  );
}
