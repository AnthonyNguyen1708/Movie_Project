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
    } catch (error) {}
  };
};

export const postUserRegisterAction = async (user) => {
  try {
    const res = await userService.postUserRegister(user);
    if (window.confirm("Đăng kí thành công, mở trang đăng nhập?")) {
      history.push("/login");
    }
  } catch (error) {
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
  } catch (error) {}
};
