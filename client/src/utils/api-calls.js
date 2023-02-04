import axios from "axios";

const appId = localStorage.getItem("appId");
const secretKey = sessionStorage.getItem("secretKey") || "YL6C09DM29";
let accessToken = sessionStorage.getItem("accessToken") || "";

const getUrl = async () => {
  return await axios.post("http://localhost:4000/auth", {
    appId,
  });
};
const getToken = async (authCode) => {
  const appId = localStorage.getItem("appId");
  return await axios.post("http://localhost:4000/auth/token", {
    appId,
    secretKey,
    authCode,
  });
};

const getProfile = async () => {
  return await axios.post("http://localhost:4000/auth/profile", {
    appId,
    accessToken,
  });
};
const getFunds = async () => {
  return await axios.post("http://localhost:4000/auth/funds", {
    appId,
    accessToken,
  });
};
export { getUrl, getToken, getProfile, getFunds };
