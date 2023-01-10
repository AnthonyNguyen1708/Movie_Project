import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { CarouselReducer } from "../reducers/CarouselReducer";

const rootReducer = combineReducers({
  CarouselReducer: CarouselReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
