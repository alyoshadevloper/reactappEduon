import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { refresh } from "../Apis/RefreshToken/RefreshToken";
import { initialState, reducer } from "../reducer/reducer";

export default function Values() {
  const [navStretch, setNavStretch] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [token, setToken] = useState("");

  const [jwtToken, setjwtToken] = useState("");

  const [responseData, setresponseData] = useState("");

  const [avatar, setAvatar] = useState("");

  const [user, setUser] = useState([]);

  //   const [submit, setSubmit] = useState(false);s

  const [videUploadBtn, setvideUploadBtn] = useState(false);

  const [addedToCart, setAddedToCart] = useState(false);

  const [addedToFav, setAddedToFav] = useState(false);

  const [statusChange, setStatusChange] = useState(false);

  const [balance, setBalance] = useState();

  const [isremoved, setIsRemoved] = useState(false);

  const [subCategoryId, setSubCategoryId] = useState();

  const [courseUpBool, setCourseUpBool] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [myEnrolledCourses, setmyEnrolledCourses] = useState(0);
  const [filterPriceValue, setFilterPriceValue] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  const loggedIn = localStorage.getItem("access");
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/wallet/info`, { headers })
        .then((res) => {
          setBalance(res.data.result.balance);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, []);

  const values = {
    navStretch,
    setNavStretch,
    phoneNumber,
    setPhoneNumber,
    token,
    setToken,
    jwtToken,
    setjwtToken,
    responseData,
    setresponseData,
    avatar,
    setAvatar,
    isremoved,
    setIsRemoved,
    balance,
    setBalance,
    loggedIn,
    state,
    dispatch,
    subCategoryId,
    setSubCategoryId,
    courseUpBool,
    setCourseUpBool,
    videUploadBtn,
    setvideUploadBtn,
    addedToCart,
    setAddedToCart,
    addedToFav,
    setAddedToFav,
    statusChange,
    setStatusChange,
    mobileMenuOpen,
    setMobileMenuOpen,
    myEnrolledCourses,
    setmyEnrolledCourses,
    user,
    setUser,
    filterPriceValue,
    setFilterPriceValue,
  };
  return values;
}
