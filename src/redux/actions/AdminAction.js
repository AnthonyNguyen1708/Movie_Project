import { history } from "../../App";
import { adminService } from "../../service/AdminService";
import actionsType from "./types/ActionsType";

export const getFullMovieListAction = async (dispatch) => {
  try {
    const res = await adminService.getFullMovieList();
    dispatch({
      type: actionsType.SET_FULL_MOVIE_LIST,
      payload: res.data.content,
    });
  } catch (error) {}
};

export const getMovieInfoAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await adminService.getMovieInfo(movieId);
      dispatch({
        type: actionsType.SET_MOVIE_INFO,
        payload: res.data.content,
      });
    } catch (error) {}
  };
};

export const postNewMovieAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await adminService.postNewMovie(data);
      alert("Thêm phim thành công!");
    } catch (error) {
      alert(`${error.response?.data.content}`);
    }
    dispatch(getFullMovieListAction);
  };
};

export const postUpdateMovieAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await adminService.postUpdateMovie(data);
      alert("Cập nhật phim thành công!");
      history.goBack();
    } catch (error) {
      alert(`${error.response?.data.content}`);
    }
    dispatch(getFullMovieListAction);
  };
};

export const deleteMovieAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await adminService.deleteMovie(movieId);
      alert("Xóa phim thành công!");
    } catch (error) {
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
  } catch (error) {}
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
      alert("Cập nhật người dùng thành công!");
    } catch (error) {}
    dispatch(getUserListAction);
  };
};

export const addNewUserAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await adminService.postNewUser(user);
      alert("Thêm người dùng thành công!");
    } catch (error) {
      alert(`${error.response.data.content}`);
    }
    dispatch(getUserListAction);
  };
};
