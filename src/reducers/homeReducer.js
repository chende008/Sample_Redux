import * as types from '../actions/types';

export default (initState = [], action) => {
    let {type, data} = action;
    switch (type) {
        case types.RANDOM_ADD:
            return [...initState, data];
        case types.RANDOM_DEL:
            return [...data];
        default:
            return initState;
    }
}
