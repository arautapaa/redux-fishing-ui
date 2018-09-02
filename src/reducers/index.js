import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import draughts from './draughts';
import selections from './selections';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  draughts: draughts,
  selections : selections
});
