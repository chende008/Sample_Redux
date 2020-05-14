import * as types from '../actions/types';

export default (initState = {pageIndex: 0, dataList: []}, action) => {
    const {type, data} = action;
    switch (type) {
        case types.DISCOVER_QUERY:
            return data;
        default:
            return initState;

    }
}
