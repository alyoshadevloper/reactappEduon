import React from "react";
import Stars from "../../assets/icons/Group 1676.png";
import EmptyStars from "../../assets/icons/Group 1675.png";
import "./courseRating.css";

export default function CourseRating() {
  return (
    <div className="courseRating">
      <h1 className="title">Reyting</h1>
      <div className="rowGrid">
        <div className="col-6 col-sm-24 left comentsCourseReting">
          <h1>4.6</h1>
          <div className="smComments">
            <img src={Stars} alt="..." />
            <p className="commentsNum"> 1280 sharh </p>
          </div>
        </div>
        <div className="col-18 col-sm-24 right">
          <ul>
            <li>
              <p className="num">5</p>
              <div className="line-back">
                <div style={{ width: "60%" }} className="line-front"></div>
              </div>
            </li>
            <li>
              <p className="num">4</p>
              <div className="line-back">
                <div style={{ width: "40%" }} className="line-front"></div>
              </div>
            </li>
            <li>
              <p className="num">3</p>
              <div className="line-back">
                <div style={{ width: "35%" }} className="line-front"></div>
              </div>
            </li>
            <li>
              <p className="num">2</p>
              <div className="line-back">
                <div style={{ width: "24%" }} className="line-front"></div>
              </div>
            </li>
            <li>
              <p className="num">1</p>
              <div className="line-back">
                <div style={{ width: "5%" }} className="line-front"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="rowGrid rating">
        <div className="col-24 col-sm-24 d-flex d-sm-block">
          <h1 className="title">Ushbu kursni qanday baxolaysiz</h1>
          <p>Reytingni o'zgartirish</p>
        </div>
        <p className="col-24 chooseRating">Reytingni tanlang</p>
        <div className="col-24 col-sm-24">
          <img src={EmptyStars} alt="..." />
        </div>
      </div>
    </div>
  );
}
