import * as types from '../actions/types';

export default (initState = {pageIndex: 0, dataList: []}, action) => {
    const {type, value} = action;
    switch (type) {
        case types.DISCOVER_QUERY:
            return value;
        default:
            return initState;

    }
}
