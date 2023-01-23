import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import RootReducer from "./Reducers";

const initialState = {};

const middleware = [thunk];

//to remove redux dev tool remove this line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}
const Store = createStore(
  RootReducer,
  initialState,
  // applyMiddleware(...middleware)
  //to remove redux dev tool remove below lines and uncommnent above one
  composeEnhancers(applyMiddleware(...middleware))
);

export default Store;
