import { createStore, combineReducers } from 'redux';
import authReducer from '../actiones/authReducer';
import alertsReducer from './features/alertSlice';
import userReducer from './features/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
