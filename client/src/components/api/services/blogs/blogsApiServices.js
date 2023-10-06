import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";


export const fetchAllBlogs = async (setGroupList, setLoading) => {
  try {
    const res = await axiosInstance.get(`/blogs/`);
    console.log(res.data);
    setGroupList(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const createBenefitGroup = async (inputs, setLoading, history) => {
  setLoading(true);
  try {
    const res = await axiosInstance.post(`/create-benefit-group`, inputs);
    toast.success(res.data.message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      theme: "colored",
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    setLoading(false);
    history.push("/company/benifits");
  } catch (err) {
    setLoading(false);
    if (err.response !== undefined) {
      toast.error(err.response.data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Internal server error.", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        theme: "colored",
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  }
};