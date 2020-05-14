import * as types from '../actions/types';

export default (initState = {text: '', dataChangedCount: 0}, action) => {
    let {type, data} = action;
    switch (type) {
        case types.STORAGE_GET_STR:
            return {...initState, text: data};
        case types.STORAGE_GET_JSON:
            return {...initState, text: data};
        case types.STORAGE_UPDATE_COUNT:
            return {...initState, dataChangedCount: data};
        default:
            return initState;
    }
};
