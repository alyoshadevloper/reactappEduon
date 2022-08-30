import React, { useContext, useState } from "react";
// import CartOne from "../../assets/icons/direct-normal.png";
// import Cart from "../../assets/images/Group 225.png";
import TextField from "@mui/material/TextField";
import uzcard from "../../assets/images/Group 13.png";
import humo from "../../assets/icons/humo.png";
import axios from "../../Apis/api";
import mastercard from "../../assets/icons/mastercard_logo.png";
import Alert from "@mui/material/Alert";
import visa from "../../assets/icons/visa logo.png";

import Button from "@mui/material/Button";
import "./withdraw.css";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { StateContext } from "../../context/Context";

export default function Withdraw(props) {
  const [amout, setAmount] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [expire, setExpire] = useState("");
  const {balance} = useContext(StateContext)

  const transfer = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/transfer`,
          {
            number: cardNum.replace(/ /g, ""),
            amount: amout,
          },
          {
            headers,
          }
        )
        .then((res) => setAlert(true))
        .catch((err) => {
          setError(!error);
          refresh(err.response.status, err.response.status.text);
        });

      setAmount("");
      setCardNum("");
    } catch (error) {}
  };

  const checkingCard = (num) => {
    if (num === "9") {
      return <img src={humo} className="eye uzcard" alt="..." />;
    } else if (num === "8") {
      return <img src={uzcard} className="eye uzcard" alt="..." />;
    } else if (num === "5") {
      return <img src={mastercard} className="eye uzcard" alt="..." />;
    } else if (num === "4") {
      return <img src={visa} className="eye uzcard" alt="..." />;
    } else {
      return null;
    }
  };

  return (
    <div className="paymentOne">
      <div className="container">
        <div className="rowGrid">
          <div className="col-10 col-lg-10 col-sm-24">
            <div className="cardBalans">
              <div className="icon">
                <div className="img">{/* <img src={Cart} alt="...." /> */}</div>
                <div className="uzs">
                  <svg
                    width="50"
                    height="51"
                    viewBox="0 0 50 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="25" cy="25.5" r="25" fill="#BFDAFF" />
                    <path
                      d="M31.04 27.05C30.62 27.46 30.38 28.05 30.44 28.68C30.53 29.76 31.52 30.55 32.6 30.55H34.5V31.74C34.5 33.81 32.81 35.5 30.74 35.5H19.26C17.19 35.5 15.5 33.81 15.5 31.74V25.01C15.5 22.94 17.19 21.25 19.26 21.25H30.74C32.81 21.25 34.5 22.94 34.5 25.01V26.45H32.48C31.92 26.45 31.41 26.67 31.04 27.05Z"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 25.9103V21.3403C15.5 20.1503 16.23 19.0903 17.34 18.6703L25.28 15.6703C26.52 15.2003 27.85 16.1203 27.85 17.4503V21.2503"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M35.5588 27.4702V29.5302C35.5588 30.0802 35.1188 30.5302 34.5588 30.5502H32.5988C31.5188 30.5502 30.5288 29.7602 30.4388 28.6802C30.3788 28.0502 30.6188 27.4602 31.0388 27.0502C31.4088 26.6702 31.9188 26.4502 32.4788 26.4502H34.5588C35.1188 26.4702 35.5588 26.9202 35.5588 27.4702Z"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 25.5H27"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="smSvg">
                    <p>Hisobdagi joriy balans</p>
                    <h1> {balance
                        ? balance
                            .toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                            .replace(",", " ")
                        : 0}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-14 col-lg-14 col-sm-24">
            <div className="cardRegister">
              <h1 className="smPay">Hisobdan pul yechish</h1>
              {error ? (
                <p className="error-messageee">Tizimda muammo yuzaga keldi</p>
              ) : null}
              <form action="" className="account">
                <div className="password">
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
                        padding: "0 0 0 25px",
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
                    type="number"
                    label="To'ldirish miqdori"
                    variant="outlined"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <h1 className="eye">UZS</h1>
                </div>
                <div className="password">
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
                        padding: "0 0 0 25px",
                        marginTop: "-2px",
                        fontWeight: "600",
                      },
                      "& .MuiInputLabel-root": {
                        top: "4px",
                      },
                      "& .MuiInputLabel-shrink": {
                        top: "0",
                        left: "2px",
                      },
                    }}
                    type="text"
                    label="Karta raqami"
                    variant="outlined"
                    onChange={(e) => {
                      let res = e.target.value
                        .replace(/[^\dA-Z]/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim();
                      res.length > 20 ? e.preventDefault() : setCardNum(res);
                    }}
                    value={cardNum}
                  />
                  {checkingCard(cardNum.slice(0, 1))}
                </div>

                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
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
                  label="Amal qilish muddati"
                  variant="outlined"
                  placeholder="mm/yy"
                  onChange={(e) => {
                    let res = e.target.value
                      .replace(/[^0-9]/g, "")
                      .replace(/^([2-9])$/g, "0$1")
                      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
                      .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
                    setExpire(res);
                  }}
                  value={expire}
                  type="text"
                />
              </form>
              <button
                className="fillBtn"
                onClick={() => {
                  setAlert(true);
                }}
              >
                To'ldirish
              </button>
            </div>
          </div>
        </div>
        <Alert
          className={alert ? "alert animation" : "alert"}
          severity="success"
        >
          <strong>
            Siz 8600 **** **** 9900 raqamli Uzcard kartasiga 100 000 UZS
            o’tkazmoqdasiz
          </strong>
          <Button
            sx={{
              width: "100%",
              height: "50px",
              borderRadius: "15px",
              backgroundColor: "#80B5FF;",
              fontFamily: "sans-serif",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "24px",
              textTransform: "none",
              marginTop: " 30px",
            }}
            variant="contained"
            className="btn"
            onClick={() => {
              setAlert(false)
              transfer()
            }}
          >
            O’tkazmani tasdiqlash
          </Button>
        </Alert>
      </div>
    </div>
  );
}
