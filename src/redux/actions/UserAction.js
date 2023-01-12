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

      history.goBack();
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
