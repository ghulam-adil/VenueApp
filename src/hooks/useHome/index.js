import { useDispatch } from "react-redux";

import { showToast } from "../../api/HelperFunction";
// import { setToken, setUser } from "../../redux/auth";
import { toggleLoading } from "../../redux/general";
import { GetVenues } from "../../redux/home";

export default () => {
  const dispatch = useDispatch();

  const getVenues = async () => {
    try {
      dispatch(toggleLoading(true));
      const response = await dispatch(GetVenues()).unwrap();
      console.log("RESPONSEEEEE IN GetVenues=======>>>>>>>>>", response);
      //   dispatch(setUser(response?.data?.user));
      dispatch(toggleLoading(false));
      return Promise.resolve(response);
    } catch (e) {
      console.log("EEERRRRRR IN GetVenues", e);
      dispatch(toggleLoading(false));
      throw new Error(e);
    }
  };

  return { getVenues };
};
