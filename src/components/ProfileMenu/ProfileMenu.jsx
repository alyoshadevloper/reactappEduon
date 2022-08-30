import React, { useContext, useEffect, useState } from "react";
import "./ProfileMenu.css";
// import Akbarali from "../../assets/images/Ellipse 2.png";
import MyAccount from "../../assets/icons/wallet-add.png";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { StateContext } from "../../context/Context";

function ProfileMenu(props) {
  const navigate = useNavigate();
  const { statusChange, balance } = useContext(StateContext);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setStatus(JSON.parse(localStorage.getItem("status")));
  }, [statusChange]);

  const logoutClick = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  };
  return (
    <div className="profileMenu">
      <div className="openProfileMenu">
        <div onClick={() => navigate("/userAbout")} className="user pointer">
          {props.img ? (
            <img
              className="avatar pointer"
              src={`${process.env.REACT_APP_API_KEY}${props.img}`}
              alt="..."
            />
          ) : (
            <AccountCircleIcon className="avatar pointer" />
          )}
          <h1>
            {`${props.name}  ${props.surname}`}
            <br /> <span>+{props.mobile}</span>
          </h1>
        </div>
        <div className="myAccount">
          <div className="myAccountTitle">
            <span>Mening hisobim</span>
            <h1>
              {balance
                ? balance.toLocaleString("uz-UZ", {
                    style: "currency",
                    currency: "UZS",
                  })
                : 0}
            </h1>
          </div>
          <img
            onClick={() => navigate("/moneyOperations")}
            className="myAccountImg"
            src={MyAccount}
            alt="MyAccount"
          />
        </div>
        <div className="title">
          <p onClick={() => navigate("/profile")} className="pointer">
            Profilni tahrirlash
          </p>
          {!status && (
            <p onClick={() => navigate("/userAbout")} className="pointer">
              Umumiy profil
            </p>
          )}
          {!status && (
            <p
              onClick={() => navigate("/myEnrolledCourses")}
              className="pointer"
            >
              Mening darslarim
            </p>
          )}
        </div>
        {status && (
          <div className="title">
            <p className="pointer" onClick={() => navigate("/userAbout")}>
              Shaxsiy kabinet
            </p>
            <p
              className="pointer"
              onClick={() => navigate("/speakerMyCourses")}
            >
              Yuklagan kurslarim
            </p>
            <p className="pointer" onClick={() => navigate("/speaker")}>
              Spiker panel
            </p>
          </div>
        )}
        <h1 onClick={logoutClick} className="exitProfile pointer">
          Profildan chiqish
        </h1>
      </div>
    </div>
  );
}

export default ProfileMenu;
