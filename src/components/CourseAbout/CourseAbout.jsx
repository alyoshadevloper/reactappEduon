import React from "react";
import "./CourseAbout.css";
export default function CourseAbout(props) {
  return (
    <div className="course-about">
      <p>{props.resData.short_descr}</p>
    </div>
  );
}
