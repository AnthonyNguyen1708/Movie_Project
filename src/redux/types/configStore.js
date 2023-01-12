import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { MoviesReducer } from "../reducers/MoviesReducer";
import { UserReducer } from "../reducers/UserReducer";

const rootReducer = combineReducers({
  movie: MoviesReducer,
  user: UserReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
