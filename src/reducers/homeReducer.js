import * as types from '../actions/types';

export default (state = [], action) => {
    let {type, data} = action;
    switch (type) {
        case types.RANDOM_ADD:
        case types.RANDOM_DEL:
            return [...data];
        default:
            return state;
    }
}
