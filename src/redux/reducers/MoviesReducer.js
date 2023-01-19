import produce from "immer";
import { TheaterInfo } from "../../_core/models/TheaterInfo";
import actionsType from "../actions/types/ActionsType";

const initialState = {
  bannerList: [],
  movieList: [],
  cinemaSystem: [],
  movieDetail: {},
  theaterDetail: new TheaterInfo(),
  bookingChairList: [],
  tabActive: "1",
};

export const MoviesReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actionsType.SET_BANNER: {
        draft.bannerList = payload;
        break;
      }

      case actionsType.SET_MOVIES_LIST: {
        draft.movieList = payload;
        break;
      }

      case actionsType.SET_CINEMAS_SYSTEM: {
        draft.cinemaSystem = payload;
        break;
      }

      case actionsType.SET_MOVIE_DETAIL: {
        draft.movieDetail = payload;
        break;
      }

      case actionsType.SET_THEATER_DETAIL: {
        draft.theaterDetail = payload;
        break;
      }

      case actionsType.SET_BOOKING_CHAIR: {
        let index = draft.bookingChairList.findIndex(
          (gheDD) => gheDD.maGhe === payload.maGhe
        );
        if (index !== -1) {
          draft.bookingChairList.splice(index, 1);
        } else {
          draft.bookingChairList.push(payload);
        }

        break;
      }

      case actionsType.BOOKING_COMPLETE: {
        draft.bookingChairList = [];
        break;
      }

      case actionsType.TAB_CHANGE_AUTO: {
        draft.tabActive = "2";
        break;
      }

      case actionsType.TAB_CHANGE_ACTIVE: {
        draft.tabActive = payload;
        break;
      }

      default:
        break;
    }
  });
};
