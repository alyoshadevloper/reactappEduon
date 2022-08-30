import React, { useContext, useState, useEffect } from "react";
import "./addMoney.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import uzcard from "../../assets/images/Group 13.png";
import humo from "../../assets/icons/humo.png";
import mastercard from "../../assets/icons/mastercard_logo.png";
import OTPInput from "otp-input-react";
import visa from "../../assets/icons/visa logo.png";
// import Switch from "@mui/material/Switch";
// import { styled } from "@mui/material/styles";
import axios from "../../Apis/api";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import { StateContext } from "../../context/Context";
export default function AddMoney(props) {
  const { balance, setConfigBalance } = useContext(StateContext);
  const { datas } = props;

  const [amout, setAmount] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expire, setExpire] = useState("");
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [tr_id, setTr_id] = useState("");
  const [OTP, setOTP] = useState("");
  const [successPayload, setsuccessPayload] = useState(false);
  const [loginError, setLoginError] = useState(null);

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
            expire: expire.replace(/\//g, ""),
            amount: amout,
          },
          {
            headers,
          }
        )
        .then((res) => {
          setAlert(true);
          setTr_id(res.data.result.tr_id);
        })
        .catch((err) => {
          setError(!error);
          refresh(err.response.status, err.response.status.text);
        });

      setAmount("");
      setCardNum("");
      setExpire("");
    } catch (error) {}
  };

  const confirmTransfer = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v1/wallet/confirm-transfer`,
          {
            tr_id: tr_id,
            code: OTP,
          },
          {
            headers,
          }
        )
        .then((res) => {
          setAlert(false);
          setsuccessPayload(true);
          setLoginError(false);
          setConfigBalance(true);
        })
        .catch((err) => {
          setError(!error);
          setsuccessPayload(false);
          setLoginError(true);
          refresh(err.response.status, err.response.status.text);
        });

      setAmount("");
      setCardNum("");
      setExpire("");
    } catch (error) {}
  };

  useEffect(() => {
    loginError &&
      setTimeout(() => {
        setLoginError(false);
      }, 3000);
    successPayload &&
      setTimeout(() => {
        setsuccessPayload(false);
      }, 3000);
  }, [loginError, successPayload]);

  // const AntSwitch = styled(Switch)(({ theme }) => ({
  //   width: 42,
  //   height: 24,
  //   padding: 0,
  //   borderRadius: "20px",
  //   display: "flex",
  //   "&:active": {
  //     "& .MuiSwitch-thumb": {
  //       width: 15,
  //     },
  //     "& .MuiSwitch-switchBase.Mui-checked": {
  //       transform: "translateX(9px)",
  //     },
  //   },
  //   "& .MuiSwitch-switchBase": {
  //     padding: 2,
  //     "&.Mui-checked": {
  //       transform: "translateX(18px)",
  //       color: "#006AFF",
  //       "& + .MuiSwitch-track": {
  //         opacity: 1,
  //         backgroundColor:
  //           theme.palette.mode === "dark" ? "#BFDAFF" : "#BFDAFF",
  //       },
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
  //     width: 20,
  //     height: 20.5,
  //     borderRadius: "50%",
  //     transition: theme.transitions.create(["width"], {
  //       duration: 200,
  //     }),
  //   },
  //   "& .MuiSwitch-track": {
  //     borderRadius: 16 / 2,
  //     opacity: 1,
  //     backgroundColor:
  //       theme.palette.mode === "dark"
  //         ? "rgba(255,255,255,.35)"
  //         : "rgba(0,0,0,.25)",
  //     boxSizing: "border-box",
  //   },
  // }));

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
                <div className="img">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <circle cx="25" cy="25" r="25" fill="#BFDAFF" />
                    <path
                      d="M31.04 26.55C30.62 26.96 30.38 27.55 30.44 28.18C30.53 29.26 31.52 30.05 32.6 30.05H34.5V31.24C34.5 33.31 32.81 35 30.74 35H19.26C17.19 35 15.5 33.31 15.5 31.24V24.51C15.5 22.44 17.19 20.75 19.26 20.75H30.74C32.81 20.75 34.5 22.44 34.5 24.51V25.95H32.48C31.92 25.95 31.41 26.17 31.04 26.55Z"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 25.4101V20.8401C15.5 19.6501 16.23 18.5901 17.34 18.1701L25.28 15.1701C26.52 14.7001 27.85 15.6201 27.85 16.9501V20.7501"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M35.5588 26.9702V29.0302C35.5588 29.5802 35.1188 30.0302 34.5588 30.0502H32.5988C31.5188 30.0502 30.5288 29.2602 30.4388 28.1802C30.3788 27.5502 30.6188 26.9602 31.0388 26.5502C31.4088 26.1702 31.9188 25.9502 32.4788 25.9502H34.5588C35.1188 25.9702 35.5588 26.4202 35.5588 26.9702Z"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 25H27"
                      stroke="#1C1C1C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="uzs">
                  <div className="smSvg">
                    <p>Hisobdagi joriy balans</p>
                    <h1>
                      {balance
                        ? balance
                            .toLocaleString("uz-UZ", {
                              style: "currency",
                              currency: "UZS",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                            .replace(",", " ")
                        : 0}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-14 col-lg-14 col-sm-24">
            <div className="cardRegister">
              <h1 className="smMarginTop smPay">Hisobni to’ldirish</h1>
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
                    value={amout}
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
              <button onClick={transfer} className="fillBtn">
                To'ldirish
              </button>
            </div>
          </div>
          <Alert
            className={alert ? "alert animation" : "alert"}
            style={{
              height: "350px",
              borderRadius: "15px",
              background: "white",
            }}
          >
            <p>
              Sizning
              <strong>
                {datas.phone
                  ? `  +${datas.phone.slice(0, 5)}  ***-**-${datas.phone.slice(
                      10,
                      12
                    )} raqamingizga tasdiqlash kodi yuborildi`
                  : null}
              </strong>
            </p>

            <div className="wrapper">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                type="number"
              />
              <p className="alertTitle">Tasdiqlash kodi</p>
            </div>
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
                confirmTransfer();
              }}
            >
              O’tkazmani tasdiqlash
            </Button>
          </Alert>
          <Alert
            className={loginError === true ? "alert animation" : "alert"}
            severity="error"
          >
            <strong>O'tkazma muvaffaqiyatsiz amalga oshdi!!!</strong>
            <br />
          </Alert>
          <Alert
            className={successPayload ? "alert animation" : "alert"}
            severity="success"
          >
            <strong>O'tkazma muvaffaqiyatli amalga oshdi!!!</strong>
          </Alert>
        </div>
      </div>
    </div>
  );
}
