import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../Apis/api";
import VisibilityOutlinedIcon from "../../assets/icons/eye.png";
import VisibilityOffOutlinedIcon from "../../assets/icons/eye-slash.png";
import "./ProfileSecurity.css";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProfileSecurity() {
  const [show, setShow] = useState(false);
  const [shownew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [responseData, setresponseData] = useState("");
  const [oldPasswordError, setoldPasswordError] = useState("");
  const [newPasswordError, setnewPasswordError] = useState("");
  const [passWordConfirmError, setpassWordConfirmError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          setresponseData(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, []);
  const sendddata = async () => {
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/change-password`,
          {
            old_password: oldPassword,
            password: passwordNew,
            password2: passwordConfirm,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setoldPasswordError("");
          setnewPasswordError("");
          setpassWordConfirmError("");
          window.location.reload();
        })
        .catch((err) => {
          err.response.data.old_password
            ? setoldPasswordError("Joriy parol xato kiritildi!")
            : setoldPasswordError("");
          err.response.data.password
            ? setnewPasswordError(
                "Parol raqamlar, kichik harflar va maxsus belgilardan tashkil topishi kerak!"
              )
            : setnewPasswordError("");
          passwordNew !== passwordConfirm
            ? setpassWordConfirmError("Parollar bir biriga mos emas!")
            : setpassWordConfirmError("");
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  return (
    <div className="security">
      <h1 className="secTitle">Parolni o'zgartirish</h1>
      <div className="rowGrid">
        <div className="col-8 col-sm-24 passwordFio">
          <TextField
            className="inputs"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "15px",
                height: "70px",
                border: "2px solid #D9D9D9",
              },
              "& .MuiOutlinedInput-input": {
                height: "70px",
                padding: "0 55px 0 25px",
                marginTop: "-2px",
              },
              "& .MuiInputLabel-root": {
                top: "4px",
              },
              "& .MuiInputLabel-shrink": {
                top: "0",
                left: "2px",
              },
            }}
            type={!show ? "password" : "text"}
            label="Joriy parol"
            variant="outlined"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {!show ? (
            <img
              src={VisibilityOutlinedIcon}
              onClick={() => setShow(!show)}
              className="eye"
              alt="..."
            />
          ) : (
            <img
              src={VisibilityOffOutlinedIcon}
              onClick={() => setShow(!show)}
              className="eye eyeSlash"
              alt="..."
            />
          )}
        </div>
        <p
          style={{ marginTop: "0 !important" }}
          className="error-messageee col-24"
        >
          {oldPasswordError}
        </p>
        <div className="col-8 col-sm-24 passwordFio">
          <TextField
            className="inputs"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "15px",
                height: "70px",
                border: "2px solid #D9D9D9",
              },
              "& .MuiOutlinedInput-input": {
                height: "70px",
                padding: "0 55px 0 25px",
                marginTop: "-2px",
              },
              "& .MuiInputLabel-root": {
                top: "4px",
              },
              "& .MuiInputLabel-shrink": {
                top: "0",
                left: "2px",
              },
            }}
            type={!shownew ? "password" : "text"}
            label="Yangi parolni kiriting"
            variant="outlined"
            onChange={(e) => setPasswordNew(e.target.value)}
          />
          {!shownew ? (
            <img
              src={VisibilityOutlinedIcon}
              onClick={() => setShowNew(!shownew)}
              className="eye"
              alt="..."
            />
          ) : (
            <img
              src={VisibilityOffOutlinedIcon}
              onClick={() => setShowNew(!shownew)}
              className="eye eyeSlash"
              alt="..."
            />
          )}
        </div>
        <p
          style={{ marginTop: "0 !important" }}
          className="error-messageee col-24"
        >
          {newPasswordError}
        </p>
        <div className="col-8 col-sm-24 passwordFio">
          <TextField
            className="inputs"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "15px",
                height: "70px",
                border: "2px solid #D9D9D9",
              },
              "& .MuiOutlinedInput-input": {
                height: "70px",
                padding: "0 55px 0 25px",
                marginTop: "-2px",
              },
              "& .MuiInputLabel-root": {
                top: "4px",
              },
              "& .MuiInputLabel-shrink": {
                top: "0",
                left: "2px",
              },
            }}
            type={!showConfirm ? "password" : "text"}
            label="Parolni tasdiqlash"
            variant="outlined"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {!showConfirm ? (
            <img
              src={VisibilityOutlinedIcon}
              onClick={() => setShowConfirm(!showConfirm)}
              className="eye"
              alt="..."
            />
          ) : (
            <img
              src={VisibilityOffOutlinedIcon}
              onClick={() => setShowConfirm(!showConfirm)}
              className="eye eyeSlash"
              alt="..."
            />
          )}
        </div>
        <p
          style={{ marginTop: "0 !important" }}
          className="error-messageee col-24"
        >
          {passWordConfirmError}
        </p>
      </div>
      <p></p>
      <Button
        sx={{
          width: "180px",
          height: "56px",
          borderRadius: "15px",
          backgroundColor: "#80B5FF;",
          fontFamily: "sans-serif",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "20px",
          lineHeight: "29px",
          textTransform: "none",
        }}
        variant="contained"
        className="btn"
        onClick={sendddata}
      >
        Saqlash
      </Button>
    </div>
  );
}
