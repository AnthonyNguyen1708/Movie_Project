import produce from "immer";
import actionsType from "../actions/types/ActionsType";

const initialState = {
  isLoading: false,
};

export const LoadingReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actionsType.SHOW_LOADING:
        draft.isLoading = true;
        break;

      case actionsType.HIDE_LOADING:
        draft.isLoading = false;
        break;

      default:
        break;
    }
  });
};
