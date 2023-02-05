import actionType from "./types/ActionsType";

import { movieService } from "../../service/MovieService";
import { BookingInfo } from "../../_core/models/BookingInfo";
import { hideLoadingAction, showLoadingAction } from "./LoadingAction";

export const getBannersAction = async (dispatch) => {
  try {
    const res = await movieService.getBannerList();

    dispatch({
      type: actionType.SET_BANNER,
      payload: res.data.content,
    });
  } catch (error) {}
};

export const getMoviesAction = (page = 1) => {
  return async (dispatch) => {
    try {
      const res = await movieService.getMovieByPage(page);

      dispatch({
        type: actionType.SET_MOVIES_LIST,
        payload: res.data.content,
      });
    } catch (error) {}
  };
};

export const getCinemaSystemAction = async (dispatch) => {
  try {
    const res = await movieService.getCinamaSystem();

    dispatch({
      type: actionType.SET_CINEMAS_SYSTEM,
      payload: res.data.content,
    });
  } catch (error) {}
};

export const getScheduleMovieCinemaAction = async (maHeThongRap) => {
  try {
    const res = await movieService.getScheduleMovieCinema(maHeThongRap);

    return res;
  } catch (error) {}
};

export const getMovieDetailAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await movieService.getMovieDetail(movieId);
      dispatch({
        type: actionType.SET_MOVIE_DETAIL,
        payload: res.data.content,
      });
    } catch (error) {}
  };
};

export const getTheaterDetailAction = (showTimeId) => {
  return async (dispatch) => {
    try {
      const res = await movieService.getTheaterDetail(showTimeId);
      dispatch({
        type: actionType.SET_THEATER_DETAIL,
        payload: res.data.content,
      });
    } catch (error) {}
  };
};

export const bookingTicketAction = (bookingInfo = new BookingInfo()) => {
  return async (dispatch) => {
    try {
      dispatch(showLoadingAction);
      await movieService.postBookingTicket(bookingInfo);
      //reload chairStatus
      await dispatch(getTheaterDetailAction(bookingInfo.maLichChieu));
      await dispatch({ type: actionType.BOOKING_COMPLETE });
      await dispatch(hideLoadingAction);
      dispatch({ type: actionType.TAB_CHANGE_AUTO });
    } catch (error) {
      dispatch(hideLoadingAction);
    }
  };
};
