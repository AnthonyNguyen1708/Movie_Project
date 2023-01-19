import produce from "immer";
import actionsType from "../actions/types/ActionsType";

const initialState = {
  movieList: [],
  userList: [],
  movieInfo: [],
};

export const AdminReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actionsType.SET_FULL_MOVIE_LIST:
        draft.movieList = payload;
        break;

      case actionsType.SET_USER_LIST:
        draft.userList = payload;
        break;

      case actionsType.SET_MOVIE_INFO:
        draft.movieInfo = payload;
        break;

      default:
        break;
    }
  });
};
