import { adminService } from "../../service/AdminService";
import actionsType from "./types/ActionsType";

export const getFullMovieListAction = async (dispatch) => {
  try {
    const res = await adminService.getFullMovieList();
    dispatch({
      type: actionsType.SET_FULL_MOVIE_LIST,
      payload: res.data.content,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getMovieInfoAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await adminService.getMovieInfo(movieId);
      dispatch({
        type: actionsType.SET_MOVIE_INFO,
        payload: res.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const postNewMovieAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await adminService.postNewMovie(data);
      alert("Thêm phim thành công!");
      console.log("res: ", res.data.content);
    } catch (error) {
      console.log("error: ", error.response?.data);
      alert(`${error.response?.data.content}`);
    }
    dispatch(getFullMovieListAction);
  };
};

export const deleteMovieAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await adminService.deleteMovie(movieId);
      console.log("res: ", res.data.content);
      alert("Xóa phim thành công!");
    } catch (error) {
      console.log("error: ", error.response?.data);
      alert(`${error.response?.data.content}`);
    }
    dispatch(getFullMovieListAction);
  };
};

export const getUserListAction = async (dispatch) => {
  try {
    const res = await adminService.getUserList();
    dispatch({
      type: actionsType.SET_USER_LIST,
      payload: res.data.content,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const deleteUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await adminService.deleteUSer(taiKhoan);

      if (res.status === 200) {
        alert("Xóa người dùng thành công!");
        dispatch(getUserListAction);
      }
    } catch (error) {
      if (error.response.status === 500) {
        alert(`${error.response.data.content}`);
      }
    }
  };
};

export const updateUserAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await adminService.postUpdateUser(user);
      console.log("res: ", res);
      alert("Cập nhật người dùng thành công!");
    } catch (error) {
      console.log("error: ", error);
    }
    dispatch(getUserListAction);
  };
};
