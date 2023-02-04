import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl, getToken } from "./utils/api-calls";

const Home = () => {
  const [appId, setAppId] = useState(localStorage.getItem("appId") || "");
  const [secretKey, setSecretKey] = useState(
    sessionStorage.getItem("secretKey") || ""
  );
  const [authCode, setAuthCode] = useState(
    sessionStorage.getItem("authCode") || ""
  );
  const [flag,setFlag] = useState(true);
  const navigate = useNavigate();

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("appId", appId);
    await getUrl().then((res) => {
      window.open(res.data, "_blank");
    });
    setFlag(false);
    
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("secretKey", secretKey);
    await getToken(authCode).then((res) => {
      sessionStorage.setItem("accessToken", res.data.access_token);
    });
    navigate('/profile')
  };

  const inputStyles = {
    padding: "10px",
    fontSize: "16px",
    width: "50%",
  };

  const buttonStyles = {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return flag ? (
    <div>
      <form onSubmit={handleInitialSubmit}>
        <input
          type="text"
          placeholder="Enter app ID"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          style={inputStyles}
        />
        <br />
        <button type="submit" style={buttonStyles}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div>
      <form onSubmit={handleFinalSubmit}>
        <input
          type="text"
          placeholder="Enter secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          style={inputStyles}
        />
        <br />
        <input
          type="text"
          placeholder="Enter auth code"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          style={inputStyles}
        />
        <br/>
        <button type="submit" style={buttonStyles}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
