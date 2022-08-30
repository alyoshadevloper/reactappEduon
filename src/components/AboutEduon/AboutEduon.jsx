import React, { useContext, useEffect } from "react";
import "./AboutEduon.css";
import { StateContext } from "../../context/Context";
import partner1 from "../../assets/images/image 59.png";
import partner2 from "../../assets/images/image 60.png";
import partner3 from "../../assets/images/image 61.png";
import partner4 from "../../assets/images/image 62.png";
import partner5 from "../../assets/images/image 64.png";
import AboutEduonIMg from "../../assets/images/abouteduonimg.png";
import AboutEduonVideo from "../../assets/images/abouteduonvideo.png";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footers/Footer";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
export default function AboutEduon(props) {
  const { navStretch } = useContext(StateContext);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className="about">
      <NavbarDemo />
      <NavbarSm />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="aboutEduon">
          <div className="container">
            <h1 className="title">Eduon platformasi haqida</h1>
          </div>

          <div className="aboutEduonImgs">
            <div className="aboutEduonImg">
              <img src={AboutEduonIMg} alt="..........." />
            </div>
            <div className="aboutEduonText">
              <h1>
                O’zbekistondagi ilk <br /> onlayn ta’lim platformasi
              </h1>
              <p>
                Treninglar, seminarlar, vebinar va onlayn darsliklar uchun
                yagona <br /> o’zbek tilidagi platforma. Muvaffaqiyatli insonlar
                ilmi bilan <br /> bo’lishamiz
              </p>
            </div>
          </div>
          <div className="container">
            <div className="rowGrid">
              <div className="col-12 col-sm-24">
                <div className="aboutUs">
                  <h1>Biz haqimizda</h1>
                  <p>
                    EduOn MFaktor tomonidan har kimga, hamma joyda hayotni
                    o'zgartiradigan ta'lim <br /> tajribalarini taqdim etish
                    niyatida asos solingan <br /> Hozirda bu O'zbekiston bo'ylab
                    million o'quvchi kelajak ko'nikmalarini o'rganish uchun{" "}
                    <br />
                    yetakchi onlayn ta'lim platformasi <br /> O'zbekistonning
                    dan ortiq eng yaxshi universitetlari va soha o'qituvchilari
                    EduOn bilan <br /> hamkorlik qilib, kurslar,
                    mutaxassisliklar, sertifikatlar va diplom dasturlarini
                    taklif <br /> qilmoqdalar
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-24">
                <div className="aboutUs">
                  <h1>Maqsadlar</h1>
                  <p>
                    EduOn dagi har bir kursni jahon miqyosidagi universitetlar
                    va kompaniyalarning ustozlari <br /> o'qitadilar, shuning
                    uchun siz istagan vaqtingizda va istagan joyda yangi
                    narsalarni <br />
                    o'rganishingiz mumkin Yuzlab kurslar talab bo'yicha video
                    ma'ruzalar, uy vazifalari mashqlari va jamoatchilik <br />
                    muhokamalari forumlariga kirish imkoniyatini beradi. Har
                    kuni o'zingiz uchun yangilik <br /> kashf eting
                  </p>
                </div>
              </div>
            </div>
            <div className="partners">
              <h1>Hamkorlarimiz</h1>
              <div className="partnersImg">
                <img src={partner1} alt="..." />
                <img src={partner2} alt="..." />
                <img src={partner3} alt="..." />
                <img src={partner4} alt="..." />
                <img src={partner5} alt="..." />
              </div>
            </div>
            <div className="videoBrifing">
              <div className="rowGrid">
                {/* <div className="col-auto"> */}
                  <h1>Video brifing</h1>
                  <img src={AboutEduonVideo} alt="..." />
                </div>
              {/* </div> */}
            </div>
            <div className="contact">
              <p>Ma'muriyat bilan aloqa</p>
              <h2>info@eduon.uz</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
