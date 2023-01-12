import produce from "immer";
import { TheaterInfo } from "../../_core/models/TheaterInfo";
import actionsType from "../actions/types/ActionsType";

const initialState = {
  bannerList: [],
  movieList: [],
  cinemaSystem: [],
  movieDetail: {},
  theaterDetail: new TheaterInfo(),
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

      default:
        break;
    }
  });
};
