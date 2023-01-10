import produce from "immer";

const initialState = {
  bannerList: [],
};

export const CarouselReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case "SET_BANNER": {
        draft.bannerList = payload;
        break;
      }
      default:
        break;
    }
  });
};
