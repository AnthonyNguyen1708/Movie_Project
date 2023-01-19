import produce from "immer";
import { ENV } from "../../util/settings/config";
import actionsType from "../actions/types/ActionsType";

let user = {};
if (localStorage.getItem(ENV.USER_PROFILE)) {
  user = JSON.parse(localStorage.getItem(ENV.USER_PROFILE));
}

const initialState = {
  profile: user,
  bookingHistory: {},
};

export const UserReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actionsType.SET_USER_PROFILE:
        localStorage.setItem(ENV.USER_PROFILE, JSON.stringify(payload));

        localStorage.setItem("accessToken", payload.accessToken);

        draft.profile = payload;
        break;

      case actionsType.SET_BOOKING_HISTORY:
        draft.bookingHistory = payload;
        break;

      default:
        break;
    }
  });
};
