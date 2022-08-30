import React, { useContext, useEffect, useState } from "react";
import "./SpeakerAbout.css";
import video from "./icons/video.png";
import teacher from "./icons/teacher.png";
import vector from "./icons/Vector.png";
import messages from "./icons/messages-2.png";
import { StateContext } from "../../context/Context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import NavbarSm from "../Navbar/NavbarSm";
// import SpeakerCourse from "../SpeakerCourse/SpeakerCourse";

function SpeakerAbout(props) {
  const { navStretch } = useContext(StateContext);
  const [speakerInfo, setSpeakerInfo] = useState("");
  const [loader, setLoader] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/speaker-profile/${id}`
        )
        .then((res) => {
          setSpeakerInfo(res.data);
          setLoader(false);
          console.log(res.data);
        })
        .catch((err) => {
          setLoader(false);
        });
    } catch (error) {
      setLoader(false);
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      <Sidebar />

      <div className="SpeakerAbout">
        {speakerInfo && (
          <div className="container">
            <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
              <div className="headrow rowGrid">
                <div className="avatar col-12 col-lg-13 col-sm-24">
                  {speakerInfo.profile_picture ? (
                    <img
                      src={`${process.env.REACT_APP_API_KEY}${speakerInfo.profile_picture}`}
                      alt="LogoImg"
                    />
                  ) : (
                    <AccountCircleIcon
                      aria-describedby={id}
                      className="avatarka pointer"
                    />
                  )}
                  <div className="LogInfo">
                    <div>
                      <h3>Spiker</h3>
                      <h1>{speakerInfo.f_name + " " + speakerInfo.l_name}</h1>
                      {speakerInfo.speciality ? (
                        <p>
                          <span>Kasbi:</span> {speakerInfo.speciality}
                        </p>
                      ) : null}
                      <p>{/* <span>Kompaniya:</span>MFactor, Deli */}</p>
                    </div>
                  </div>
                </div>
                <div className="AvInfos col-12 col-lg-11 col-sm-24">
                  <div className="infos">
                    <div className="left ">
                      <div className="top">
                        <div className="course">
                          <img src={video} alt="..." />
                          <p className="smMedia">Kurslar</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">12 ta</span>
                        </h3>
                      </div>
                      <div className="bottom">
                        <div className="favorite">
                          <img src={vector} alt="..." />
                          <p className="smMedia">Spiker reytingi</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">4,7 </span>(54,110)
                        </h3>
                      </div>
                    </div>
                    <div className="right">
                      <div className="top">
                        <div className="teacher">
                          <img src={teacher} alt="..." />
                          <p className="smMedia">Jami talabalar</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">9 812 ta</span>
                        </h3>
                      </div>
                      <div className="bottom">
                        <div className="messages">
                          <img src={messages} alt="..." />
                          <p className="smMedia">Izohlar</p>
                        </div>
                        <h3>
                          <span className="smMarginLeft">9 812 ta </span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aboutMe rowGrid">
                <div className="col-24">
                  <h3>Men haqimda</h3>
                </div>
                <div className="aboutMeInfo col-24">
                  {speakerInfo.about_me ? <p>{speakerInfo.about_me}</p> : null}
                </div>
              </div>
              <div className="col-24">{/* <FavoriteCourses /> */}</div>
            </div>
          </div>
        )}
        {loader && (
          <div className="loader">
            <BounceLoader color="#006AFF" speedMultiplier={1.2} />
          </div>
        )}
      </div>
    </>
  );
}

export default SpeakerAbout;
