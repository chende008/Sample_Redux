import * as types from '../actions/types';

const initState = {pageIndex: 0, dataList: []};

export default (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case types.DISCOVER_QUERY_RESET:
            return {...state, ...data};
        case types.DISCOVER_QUERY_ADD:
            return {...data, dataList: [...state.dataList, ...data.dataList]};
        default:
            return state;

    }
}
