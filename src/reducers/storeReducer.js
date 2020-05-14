import * as types from '../actions/types';

export default (state = {text: '', dataChangedCount: 0}, action) => {
    let {type, data} = action;
    switch (type) {
        case types.STORAGE_GET_STR:
            return {...state, text: data};
        case types.STORAGE_GET_JSON:
            return {...state, text: data};
        case types.STORAGE_UPDATE_COUNT:
            return {...state, dataChangedCount: data};
        default:
            return state;
    }
};
