import * as types from '../actions/types';

export default (initState = [], action) => {
    let {type, value} = action;
    switch (type) {
        case types.RANDOM_ADD:
            return [...initState, value];
        case types.RANDOM_DEL:
            return [...value];
        default:
            return initState;
    }
}
