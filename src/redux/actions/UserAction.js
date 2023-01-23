import { userService } from "../../service/UserService";
import actionType from "./types/ActionsType";
import { history } from "../../App";

export const postUserLogin = (user) => {
  return async (dispatch) => {
    try {
      const res = await userService.postUserLogin(user);
      dispatch({
        type: actionType.SET_USER_PROFILE,
        payload: res.data.content,
      });

      history.push("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const postUserRegisterAction = async (user) => {
  try {
    const res = await userService.postUserRegister(user);
    if (window.confirm("Mở trang đăng nhập?")) {
      history.push("/login");
    }
    console.log("res: ", res);
  } catch (error) {
    console.log("error: ", error.response.data.content);
    alert(`${error.response.data.content}`);
  }
};

export const bookingHistoryAction = async (dispatch) => {
  try {
    const res = await userService.postBookingHistory();
    dispatch({
      type: actionType.SET_BOOKING_HISTORY,
      payload: res.data.content,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
