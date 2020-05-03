import * as types from '../actions/types';

export default (initState = {text: '', dataChangedCount: 0}, action) => {
    let {type, value} = action;
    switch (type) {
        case types.STORAGE_GET_STR:
            return {...initState, text: value};
        case types.STORAGE_GET_JSON:
            return {...initState, text: value};
        case types.STORAGE_UPDATE_COUNT:
            return {...initState, dataChangedCount: value};
        default:
            return initState;
    }
};
