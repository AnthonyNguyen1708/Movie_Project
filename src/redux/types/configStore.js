import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { AdminReducer } from "../reducers/AdminReducer";
import { LoadingReducer } from "../reducers/LoadingReducer";
import { MoviesReducer } from "../reducers/MoviesReducer";
import { UserReducer } from "../reducers/UserReducer";

const rootReducer = combineReducers({
  movie: MoviesReducer,
  user: UserReducer,
  loading: LoadingReducer,
  admin: AdminReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
