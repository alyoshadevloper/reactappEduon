import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { StateContext } from "./context/Context";
import SidebarSm from "./components/Sidebar/SidebarSm";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import Values from "./context/Values";
import RoutesComp from "./Routes/Routes/Routes";

function App() {
  const values = Values();
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <div className="app">
      <StateContext.Provider value={{ ...values }}>
        <BrowserRouter>
          <SidebarSm />
          <MobileMenu />
          {/* Routes ------ */}
          <RoutesComp />
          {/* Routes/ ------ */}
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
