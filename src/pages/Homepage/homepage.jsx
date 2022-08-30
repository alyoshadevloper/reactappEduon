import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Courses from "../../components/Courses/Courses";
import NavbarDemo from "../../components/Navbar/Navbar";
import NavbarSm from "../../components/Navbar/NavbarSm";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarSm from "../../components/Sidebar/SidebarSm";
import { StateContext } from "../../context/Context";
import "./homepage.css";

export default function Homepage(props) {

  const {statusChange } = useContext(StateContext)
  // const navigate = useNavigate()
 
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("status"))) {
      localStorage.setItem("status", false)
      
      window.location.reload()
    } 
  }, [statusChange])
  return (
    <div className="homepage">
      <NavbarDemo />
      <NavbarSm/>
      <SidebarSm active={0}/>
      <Sidebar active={1} />
      <Courses />
    </div>
  );
}
