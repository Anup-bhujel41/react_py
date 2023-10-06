import axiosInstance from "../axiosInstance";
import { errorToast } from "../../common/toastifier/toastify";

export const handleLogin = async (data, navigate, setLoading) => {
  try {
    const res = await axiosInstance.post(`/login/`, data);
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    navigate("/");
    setLoading(false);
  } catch (err) {
    setLoading(false);
    if (err.response === undefined) {
      errorToast("Internal server error.");
    } else {
      errorToast(err.response.data.message);
    }
  }
};

export const handleLogout = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    await axiosInstance.post(`/logout/`, {
      refresh_token,
    });
    localStorage.clear();
    window.location = "/";
  } catch (err) {
    if (err.response === undefined) {
      errorToast("Internal server error.");
    } else {
      errorToast(err.response.data.message);
    }
  }
};
