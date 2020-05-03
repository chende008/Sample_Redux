import {combineReducers} from 'redux';
import homeReducer from './homeReducer';
import discoverReducer from './discoverReducer';
import mineReducer from './mineReducer';
import storeReducer from './storeReducer';

export default combineReducers({
    homeReducer,
    discoverReducer,
    mineReducer,
    storeReducer,
});
