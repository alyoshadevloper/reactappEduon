import React, { useContext, useEffect, useState } from "react";
import CourseItem from "../CourseItem/CourseItem";
import "../../assets/css/Grid.css";
import "./Courses.css";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import CoursesSkeleton from "../CoursesSkeleton/CoursesSkeleton";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const { navStretch, addedToCart, addedToFav } =
    useContext(StateContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [courseData, setCourseData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);

  const [favItems, setFavItems] = useState([]);
  const [favData, setFavData] = useState([]);

  const navigateToCourses = (id, name) => {
    name === "Barchasi" ? navigate("/") : navigate(`/courses/${id}`);
    localStorage.setItem("activeCategory", name);
  };
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/orders/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setCartData(res.data.items);
          setCartItems(res.data.items.map((item) => item.course.id));
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [addedToCart]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/list-fav-courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setFavData(res.data);
          setFavItems(res.data.map((item) => item.id));
        })
        .catch((err) => {
          // refresh(err.status, err.status.text);
        });
    } catch (error) {}
  }, [addedToFav]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/`)
        .then((res) => {
          setCourseData(res.data);
          console.log(res)
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`)
        .then((res) => {
          setCategories(res.data);
        });
    } catch (error) {}
  }, []);

  // useEffect(() => {
  for (let i = 0; i < courseData.length; i++) {
    if (window.innerWidth > 1300) {
      if ((i + 1) % 4 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    } else if (window.innerWidth < 1300) {
      if ((i + 1) % 3 === 0) {
        courseData[i].className = "cards-left";
      } else {
        courseData[i].className = "cards-right";
      }
    }
  }
  // }, [courseData]);

  useEffect(() => {
    setActiveCategory(localStorage.getItem("activeCategory"));
  }, [navigate]);
  localStorage.setItem("activeCategory", "Barchasi");

  return (
    <div className="pt-0">
      <div className={navStretch ? "ml-240" : "ml-100"}>
        <div>
          <div>
            <div className="navBotMenu ">
              <ul>
                {categories.map((item, index) => (
                  <li
                    key={index}
                    className={
                      activeCategory === item.name ? "activeCategory" : ""
                    }
                    onClick={() => navigateToCourses(item.id, item.name)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="container">
          {courseData.length != 0 ? (
            <div className="rowGrid">
              {courseData.map((course, index) => (
                <div className="col-6 col-lg-8 col-sm-24 course-card">
                  <CourseItem
                    key={index}
                    id={course.id}
                    video={course.video}
                    label={null}
                    title={course.name}
                    trainer={course.course_owner.full_name}
                    trainerId={course.course_owner.id}
                    rating={course.null}
                    ratersNumber={null}
                    graduates={course.enrolled_students}
                    priceLine={null}
                    price={course.price}
                    dicountAvailable={null}
                    updated_at={course.updated_at}
                    level={course.level}
                    about={course.short_descr}
                    coverImg={course.cover_img}
                    recommendation={course.recommendation}
                    exchange_url={course.exchange_url}
                    ratings={course.course_rating}
                    key_words={course.key_words}
                    trailer_url={course.trailer_url}
                    category={course.category}
                    subcategory={course.subcategory}
                    type={course.type}
                    lang={course.lang}
                    class={course.className}
                    cartItemsIds={cartItems}
                    isAddedToCart={cartItems.some((item) => item == course.id)}
                    isAddedToFav={favItems.some((item) => item == course.id)}
                    cartData={cartData}
                    favData={favData}
                  />
                </div>
              ))}
            </div>
          ) : (
            <CoursesSkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
