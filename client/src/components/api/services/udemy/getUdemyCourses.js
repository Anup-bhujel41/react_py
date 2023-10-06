import axios from "axios";
import axiosInstance from "../../axiosInstance";


export const getUdemyCourses = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get(`/blogs/`);
      let data = res.data;
      dispatch({
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
